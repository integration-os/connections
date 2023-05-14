import { TokenSet, XeroClient } from "xero-node";
import axios from "axios";
import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { XeroOAuth2TokenSet } from "./lib/types";

export class XeroDriver implements DestinationClassI {
  private client: XeroClient;

  private tenantIds: string[];

  private readonly XERO_CLIENT_ID: any;

  private readonly XERO_CLIENT_SECRET: any;

  constructor({ XERO_CLIENT_ID, XERO_CLIENT_SECRET }: AnyObject) {
    this.XERO_CLIENT_ID = XERO_CLIENT_ID;
    this.XERO_CLIENT_SECRET = XERO_CLIENT_SECRET;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    this.client = new XeroClient({
      clientId: this.XERO_CLIENT_ID,
      clientSecret: this.XERO_CLIENT_SECRET,
      redirectUris: [config.oauth2.redirectUri],
      scopes: config.oauth2.scopes,
      httpTimeout: 3000,
    });

    const tokenSet: XeroOAuth2TokenSet = config.oauth2.resolved;

    this.client.setTokenSet(tokenSet as TokenSet);

    // get tenants
    const response = await axios.get("https://api.xero.com/connections", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenSet.access_token}`,
      },
    });
    this.tenantIds = response.data.map((item: any) => item.tenantId);
  }

  async disconnect(): Promise<void | Truthy> {
    this.client = null;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.client.accountingApi.getAccounts(this.tenantIds[0]);

      return {
        success: true,
        message: "Connection established successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: "Could not establish connection to Xero",
      };
    }
  }

  async performAction(prop: string | symbol, data: any) {
    const [api, method] = prop.toString().split(".");

    switch (api) {
      case "accountingApi":
        return this.client.accountingApi[method](this.tenantIds[0], data);

      // TODO: Add support for other APIs
      default:
        throw new Error(`Method ${prop as string}() for Xero not found`);
    }
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new XeroDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      if (typeof driver[prop] === "function") {
        if (prop === "testConnection") {
          return async () => driver.testConnection();
        }

        // Force the proxy to return a Promise that only resolves once the connection has been established
        if (prop === "connect") {
          return async () => {
            await driver.connect(config);
          };
        }

        // Force the proxy to return a Promise that only resolves once the connection has been dropped
        if (prop === "disconnect") {
          return async () => {
            await driver.disconnect();
          };
        }

        return async (payload) => {
          try {
            await driver.connect(config);

            const result = await target.performAction(prop, payload);

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
