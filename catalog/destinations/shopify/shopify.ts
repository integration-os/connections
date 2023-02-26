import axios, { AxiosInstance } from "axios";
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
   * @param resource primary Shopify resource
   * @param secondaryResource secondary Shopify resource
   */
  process(method: "POST" | "PUT" | "DELETE", resource: string, secondaryResource?: string) {
    switch (method) {
      case "POST":
        return async (payload?: ShopifyAction) => {
          const path = composeUriSuffix(resource, secondaryResource, payload);
          return this.client.post(path, payload.data);
        };
      case "PUT":
        return async (payload?: ShopifyAction) => {
          const path = composeUriSuffix(resource, secondaryResource, payload);
          return this.client.put(path, payload.data);
        };
      case "DELETE":
        return async (payload?: ShopifyAction) => {
          const path = composeUriSuffix(resource, secondaryResource, payload);
          return this.client.delete(path);
        };
      default:
        throw new Error(`Method ${method} not supported`);
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new ShopifyDriver(config);

  return new Proxy(driver, {
    get: async (target, action) => {
      if (["testConnection", "connect", "disconnect"].includes(String(action))) {
        return target[action](config);
      }

      const [resource, ...rest] = String(action).split(".");

      if (!rest.length || rest.length > 2) {
        throw new Error(`Unknown action: ${String(action)}`);
      }

      if (rest.length === 1) {
        const method = extractMethod(rest[0]);

        await target.connect(config);
        const result = await target.process(method, resource);
        await target.disconnect();

        return result;
      }

      const secondaryResource = rest[0];
      const method = extractMethod(rest[1]);

      await target.connect(config);
      const result = await target.process(method, secondaryResource);
      await target.disconnect();

      return result;
    },
  });
}
