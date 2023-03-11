import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import { RutterDecodedToken, RutterWebhook } from "./types";
import { Events } from "../../../../types/sourceClassDefinition";

const MANDATORY_EVENTS = [
  "INITIAL_UPDATE",
  "HISTORICAL_UPDATE",
  "CONNECTION_UPDATED",
  "CONNECTION_NEEDS_UPDATE",
  "CONNECTION_DISABLED",
  "CONNECTION_LINK_ERROR",
  "CONNECTION_ERROR",
];

export default class RutterConnection {
  static readonly BASE_URL = "https://production.rutterapi.com/graphql";

  private readonly email: string;

  private readonly password: string;

  private ACCESS_TOKEN: string;

  private client: AxiosInstance;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  /**
   * Initialize the Rutter connection by getting an access token and initializing the client
   */
  async init() {
    this.ACCESS_TOKEN = await this.getAccessToken();
    await this.initializeClient();
  }

  /**
   * Create a Rutter webhook with the passed events
   * @param webhookUrl Event webhook URL
   * @param events list of Webhook Types to subscribe to
   */
  async createWebhook({ webhookUrl, events }: {webhookUrl: string, events: Events}): Promise<boolean> {
    await this.rotateAccessToken();

    const allowedWebhookTypes = `[${events.map((event) => `"${event}"`).join(", ")}]`;

    // TODO: change isSandbox to false
    const mutation = `
      mutation {
        addWebhookConfigToOrg(input: {
          url: "${webhookUrl}",
          isSandbox: true, 
          allowedWebhookTypes: ${allowedWebhookTypes}
        }) {
          org {
            id
            webhookConfigs {
              id
              url
              isSandbox
              disabled        
              allowlist {
                allowedTypes
              }
            }
          }
        }
      }
    `;

    await this.client.post("", { query: mutation });

    return true;
  }

  /**
   * Find a Rutter webhook given its URL
   * @param url Webhook URL
   */
  async findWebhookByUrl(url: string): Promise<RutterWebhook> {
    const query = `
      query WebHooks {
        me {
          organization {
            webhookConfigs {
              id        
              url        
              isSandbox
              disabled        
              allowlist {
                allowedTypes
              }
          }
        }
      }
    }`;

    const response = await this.client.post("", { query });
    const webhooks: Array<RutterWebhook> = response.data.data.me.organization.webhookConfigs;

    for (const webhook of webhooks) {
      if (webhook.url === url) {
        return webhook;
      }
    }

    throw Error("Could not find webhook with the given URL");
  }

  /**
   * Find a Rutter webhook given its ID
   * @param webhookId Webhook ID
   */
  async findWebhookById(webhookId: string) {
    const query = `
      query WebHooks {
        me {
          organization {
            webhookConfigs {
              id        
              url        
              isSandbox
              disabled        
              allowlist {
                allowedTypes
              }
          }
        }
      }
    }`;

    const response = await this.client.post("", { query });
    const webhooks: Array<RutterWebhook> = response.data.data.me.organization.webhookConfigs;

    for (const webhook of webhooks) {
      if (webhook.id === webhookId) {
        return webhook;
      }
    }

    throw Error("Could not find webhook with the given ID");
  }

  /**
   * Update the events for a Rutter webhook
   * @param webhookId Rutter Webhook ID
   * @param events list of Webhook Types to subscribe to
   */
  async updateWebhookEvents(webhookId: string, events: Events): Promise<RutterWebhook> {
    await this.rotateAccessToken();

    const allowedWebhookTypes = `[${events.map((event) => `"${event}"`).join(", ")}]`;

    const mutation = `
      mutation {
        updateWebhookConfig(input: {
          id: "${webhookId}",
          allowedWebhookTypes: ${allowedWebhookTypes}
        }) {
          webhookConfig {
            id
            allowlist {
              allowedTypes
            }
          }
        }
      }
    `;

    const response = await this.client.post("", { query: mutation });

    return response.data.data.updateWebhookConfig.webhookConfig as RutterWebhook;
  }

  /**
   * Drop a Rutter webhook
   * @param webhookId
   */
  async dropWebhook(webhookId: string): Promise<boolean> {
    const mutation = `
      mutation {
        deleteWebhookUrl(input: {id: "${webhookId}"}){
          error {
            code
            message
          }
        }
      }`;

    const response = await this.client.post("", { query: mutation });
    return response.data.data.deleteWebhookUrl.error === null;
  }

  /**
   * Get the subscribed events for a Rutter webhook
   * @param webhookId
   */
  async getSubscribedEvents(webhookId: string) {
    const webhook = await this.findWebhookById(webhookId);

    return webhook.allowlist.allowedTypes.filter((event) => !MANDATORY_EVENTS.includes(event));
  }

  /**
   * Rotate the access token if it has expired. To be used before every request.
   * @private
   */
  private async rotateAccessToken() {
    const decodedToken = jwtDecode(this.ACCESS_TOKEN) as RutterDecodedToken;

    if (decodedToken.exp < Date.now() / 1000) {
      await this.init();
    }
  }

  /**
   * Initialize the axios client
   * @private
   */
  private async initializeClient() {
    this.client = axios.create({
      baseURL: RutterConnection.BASE_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "event",
      },
    });
  }

  /**
   * Get the access token from Rutter's GraphQL API
   * @private
   */
  private async getAccessToken(): Promise<string> {
    const mutation = `
      mutation {
        login(email: "${this.email}", password: "${this.password}") {
           token
        }
      }
    `;

    const response = await axios.post(RutterConnection.BASE_URL, { query: mutation });

    return response.data.data.login.token;
  }
}
