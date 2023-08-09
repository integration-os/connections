import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DestinationClassI } from "../../../types/destinationClassDefinition";
import { AnyObject, TestConnection, Truthy } from "../../../types/sourceClassDefinition";
import { ActionPayload } from "./lib/types";

export class SageDriver implements DestinationClassI {
  private readonly SAGE_CLIENT_ID: string;

  private readonly SAGE_CLIENT_SECRET: string;

  public client: AxiosInstance;

  constructor({ SAGE_CLIENT_ID, SAGE_CLIENT_SECRET }: AnyObject) {
    this.SAGE_CLIENT_ID = SAGE_CLIENT_ID;
    this.SAGE_CLIENT_SECRET = SAGE_CLIENT_SECRET;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    this.client = axios.create({
      baseURL: "https://api.accounting.sage.com/v3.1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.oauth2.accessToken}`,
      },
    });

    return true;
  }

  async disconnect(): Promise<void | Truthy> {
    this.client = null;

    return true;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.client.get("/journals", {
        params: {
          page: 1,
          items_per_page: 1,
        },
      });

      return {
        success: true,
        message: "Connection established successfully",
      };
    } catch (e) {
      return {
        success: false,
        message: `Could not establish connection to Sage: ${e.message}`,
      };
    }
  }

  /**
   * Perform an action on Sage accounting destination
   * @param action - The action to perform
   * @param payload - The payload to send to Sage
   */
  async performAction(action: string, payload: ActionPayload): Promise<any> {
    // extract action information
    let resource;
    let secondaryResource: string | null = null;
    let method;

    const split = action.split(".");

    if (split.length === 2) {
      [resource, method] = split;
    } else if (split.length === 3) {
      [resource, secondaryResource, method] = split;
    } else {
      throw new Error(`Invalid action: ${action}`);
    }

    // compose the URL
    let url = `/${resource}`;

    if (payload.id) {
      url += `/${payload.id}`;

      if (secondaryResource) {
        url += `/${secondaryResource}`;
      }
    }

    // perform the action
    const { body, params } = payload;
    let response: AxiosResponse;

    switch (method) {
      case "create":
        response = await this.client.post(url, body, { params });

        return response.data;
      case "update":
        response = await this.client.put(url, body, { params });

        return response.data;
      case "delete":
        response = await this.client.delete(url, { params });

        return response.data;
      default:
        throw new Error(`Invalid action method: ${method}`);
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new SageDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      // return the client
      if (prop === "client") {
        return driver.client;
      }

      if (typeof driver[prop] === "function") {
        return async (action, payload) => {
          if (prop === "testConnection") {
            return driver.testConnection();
          }

          if (prop === "connect") {
            // action in this case is the config object
            return driver.connect(action || config);
          }

          if (prop === "disconnect") {
            return driver.disconnect();
          }

          try {
            await driver.connect(config);

            const result = await target.performAction(action, payload);

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
