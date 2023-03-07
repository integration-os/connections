import axios, { AxiosInstance, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { ShopifyAction } from "./lib/types";
import { composeUriSuffix, extractMethod } from "./lib/utils";

const API_VERSION = "2023-01";

export class ShopifyDriver implements DestinationClassI {
  private SHOPIFY_STORE_NAME: string;

  private SHOPIFY_ACCESS_KEY: string;

  client: AxiosInstance;

  constructor({ SHOPIFY_STORE_NAME, SHOPIFY_ACCESS_KEY }: AnyObject) {
    this.SHOPIFY_STORE_NAME = SHOPIFY_STORE_NAME;
    this.SHOPIFY_ACCESS_KEY = SHOPIFY_ACCESS_KEY;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    const { SHOPIFY_STORE_NAME, SHOPIFY_ACCESS_KEY } = config || this;

    // create an axios client for Shopify REST API
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
    this.client = null;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.connect();
      await this.client.get("/events.json");

      return {
        success: true,
        message: "Connection to Shopify was successful",
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { errors } = err.response.data as any;

        throw new Error(`Connection to Shopify failed: ${JSON.stringify(errors)}`);
      }

      throw new Error(`Connection to Shopify failed: ${err.message}`);
    }
  }

  /**
   * Process the passed Shopify action
   * @param method HTTP method
   * @param path RESTful URL suffix
   * @param data JSON data
   */
  async process(method: "POST" | "PUT" | "DELETE", path: string, data?: AnyObject) {
    try {
      let result: AxiosResponse;

      switch (method) {
        case "PUT":
          result = await this.client.put(path, data);
          break;
        case "DELETE":
          result = await this.client.delete(path);
          break;
        case "POST":
        default:
          result = await this.client.post(path, data);
          break;
      }

      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response.status === 406) {
          throw new Error("[Shopify] The selected action is not supported");
        }

        const { errors } = err.response.data as any;

        if (err.response.status === 400) {
          throw new Error(`[Shopify] Bad Request: ${JSON.stringify(errors)}`);
        }

        throw new Error(`[Shopify] An error occurred while contacting Shopify API: ${JSON.stringify(errors) || err.message}`);
      }

      throw err;
    }
  }

  async setRetryPolicy() {
    // Initialize a retry policy
    axiosRetry(this.client, {
      retryDelay: axiosRetry.exponentialDelay,
      retries: 5,
      retryCondition: (error) => error.response?.status === 429,
    });
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new ShopifyDriver(config);

  return new Proxy(driver, {
    get: (target, action) => {
      if (String(action) === "client") {
        return target.client;
      }

      if (typeof driver[action] === "function") {
        if (action === "testConnection") {
          return async () => driver.testConnection();
        }

        if (action === "connect") {
          return async (localConfig?: AnyObject) => {
            await driver.connect(localConfig || config);
          };
        }

        if (action === "disconnect") {
          return async () => driver.disconnect();
        }
      }

      return async (payload: ShopifyAction) => {
        // split the action string by . separator
        const [resource, ...rest] = String(action).split(".");

        // validate the split
        if (rest.length === 0 || rest.length > 2) {
          throw new Error(`Unknown action format: ${String(action)}`);
        }

        // extract method and URL suffix
        let method: "POST" | "PUT" | "DELETE";
        let path: string;

        if (rest.length === 1) {
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
        await target.setRetryPolicy();
        const result = await target.process(method, path, payload.data);
        await target.disconnect();

        return result;
      };
    },
  });
}
