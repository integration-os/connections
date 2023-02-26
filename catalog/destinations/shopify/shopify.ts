import axios, { AxiosInstance } from "axios";
import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";

const API_VERSION = "2023-01";

export class ShopifyDriver implements DestinationClassI {
  private SHOPIFY_STORE_NAME: string;

  private SHOPIFY_ACCESS_KEY: string;

  private client: AxiosInstance;

  constructor({ SHOPIFY_STORE_NAME, SHOPIFY_ACCESS_KEY }: AnyObject) {
    this.SHOPIFY_STORE_NAME = SHOPIFY_STORE_NAME;
    this.SHOPIFY_ACCESS_KEY = SHOPIFY_ACCESS_KEY;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    const { SHOPIFY_STORE_NAME, SHOPIFY_ACCESS_KEY } = config || this;

    this.client = axios.create({
      baseURL: `https://${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/${API_VERSION}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_KEY,
      },
    });
  }

  async disconnect(): Promise<void | Truthy> {
    this.client = undefined;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.client.get("/events.json");

      return {
        success: true,
        message: "Connection to Shopify was successful",
      };
    } catch (err) {
      return {
        success: false,
        message: `Connection to Shopify failed: ${err.response.data.errors}`,
      };
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new ShopifyDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      if (typeof driver[prop] === "function") {
        return async (payload) => {
          try {
            await driver.connect(config);

            const result = await target[prop](payload);

            await driver.disconnect();

            return result;
          } catch (err) {
            console.log("Error occurred ===> ", err);
            throw err;
          }
        };
      }

      throw new Error(`Method ${prop as string}() not found`);
    },
  });
}
