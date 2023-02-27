import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { ShopifyAction } from "./lib/types";
import { composeUriSuffix, extractMethod } from "./lib/utils";

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
    axiosRetry(this.client, {
      retryDelay: axiosRetry.exponentialDelay,
      retries: 5,
      retryCondition: (err) => err.response.status === 429 });
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

  /**
   * Process the passed Shopify action
   * @param method HTTP method
   * @param path RESTful URL suffix
   * @param data JSON data
   */
  process(method: "POST" | "PUT" | "DELETE", path: string, data?: AnyObject) {
    try {
      switch (method) {
        case "POST":
          return this.client.post(path, data);

        case "PUT":
          return this.client.put(path, data);

        case "DELETE":
          return this.client.delete(path);

        default:
          throw new Error(`Method ${method} not supported`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response.status === 406) {
          throw new Error("[Shopify] The selected action is not supported");
        }

        if (err.response.status === 400) {
          throw new Error(`[Shopify] Bad Request: ${err.response.data.errors}`);
        }
      }

      throw err;
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new ShopifyDriver(config);

  return new Proxy(driver, {
    get: async (target, action) => {
      if (["testConnection", "connect", "disconnect"].includes(String(action))) {
        return async () => target[action](config);
      }

      return async (payload: ShopifyAction) => {
        // split the action string by . separator
        const [resource, ...rest] = String(action).split(".");

        // validate the split
        if (!rest.length || rest.length > 2) {
          throw new Error(`Unknown action format: ${String(action)}`);
        }

        // extract method and URL suffix
        let method: "POST" | "PUT" | "DELETE";
        let path: string;

        if (rest.length === 1) {
          //
          method = extractMethod(rest[0]);
          path = composeUriSuffix({
            resource,
            payload,
          });
        } else {
          method = extractMethod(rest[1]);

          const secondaryResource = rest[0];
          path = composeUriSuffix({
            resource,
            secondaryResource,
            payload,
          });
        }

        // issue action
        await target.connect(config);
        const result = await target.process(method, path, payload.data);
        await target.disconnect();

        return result;
      };
    },
  });
}
