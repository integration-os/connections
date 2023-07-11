import { XeroClient } from "xero-node";
import axios from "axios";
import { TestConnection, AnyObject } from "../../../types/sourceClassDefinition";
import jwt_decode from "jwt-decode";

export default class Xero {
  public client: XeroClient;

  public tenantIds: string[];

  private readonly XERO_CLIENT_ID: string;

  private readonly XERO_CLIENT_SECRET: string;

  private readonly XERO_ACCESS_TOKEN: string;

  private readonly XERO_REFRESH_TOKEN: string;

  constructor({
    XERO_CLIENT_ID,
    XERO_CLIENT_SECRET,
    XERO_ACCESS_TOKEN,
    XERO_REFRESH_TOKEN,
  }: AnyObject) {
    this.XERO_CLIENT_ID = XERO_CLIENT_ID;
    this.XERO_CLIENT_SECRET = XERO_CLIENT_SECRET;
    this.XERO_ACCESS_TOKEN = XERO_ACCESS_TOKEN;
    this.XERO_REFRESH_TOKEN = XERO_REFRESH_TOKEN;

    this.client = new XeroClient({
      clientId: XERO_CLIENT_ID,
      clientSecret: XERO_CLIENT_SECRET,
      httpTimeout: 3000,
    });
  }

  async init({ webhookUrl, events }) {
    return {
      webhookData: {},
      events,
    };
  }

  async verifyWebhookSignature({ request, signature, secret }) {
    // Validation falls on the user to implement
    return true;
  }

  async subscribe({ webhookId, events }) {
    return {
      webhook: {},
      events: [],
    };
  }

  async unsubscribe({ webhookId, events }) {
    return {
      events: [],
      webhook: {},
    };
  }

  async getWebhooks() {
    return [];
  }

  async getSubscribedEvents({ webhookId }) {
    return [];
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const validTokenSet = await this.client.refreshWithRefreshToken(
        this.XERO_CLIENT_ID,
        this.XERO_CLIENT_SECRET,
        this.XERO_REFRESH_TOKEN,
      );

      const accessToken = validTokenSet.access_token;

      const decodedToken: {
        authentication_event_id: string;
      } = jwt_decode(accessToken);
  
      this.client.setTokenSet(validTokenSet);

      const response = await axios.get("https://api.xero.com/connections", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          authEventId: decodedToken.authentication_event_id
        }
      });

      this.tenantIds = response.data.map((item: any) => item.tenantId);

      if (this.tenantIds.length === 0 || this.tenantIds.length > 1) {
        const existingTenants = await axios.get("https://api.xero.com/connections", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        });

        const tenantNames = existingTenants.data.map(item => item.tenantName).join(", ");
        const existingTenantsMessage = tenantNames.length > 0 ? ` The following tenants are currently connected: ${tenantNames}.` : "";

        throw new Error(`No tenant was explicitly selected on connect.${existingTenantsMessage}Ensure you disconnect and connect again with a single tenant selected.`);
      }

      await this.client.accountingApi.getAccounts(this.tenantIds[0]);

      return {
        success: true,
        message: "Connection established successfully",
      };
    } catch (err) {
      throw new Error(err.message || `Could not establish connection to Xero: ${err.response?.body}`);
    }
  }
}
