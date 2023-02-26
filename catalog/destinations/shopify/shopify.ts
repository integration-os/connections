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

  process(method: "POST" | "PUT" | "DELETE", path: string, payload?: AnyObject) {
    switch (method) {
      case "POST":
        return this.client.post(path, payload);
      case "PUT":
        return this.client.put(path, payload);
      case "DELETE":
        return this.client.delete(path, payload);
      default:
        throw new Error(`Method ${method} not supported`);
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new ShopifyDriver(config);

  return new Proxy(driver, {
    get: (target, action) => {
      throw new Error("Proxy get not implemented");
    },
  });
}
