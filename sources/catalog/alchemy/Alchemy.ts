import {
  IntegrationClassI,
  InitProps,
  InitReturns,
  VerifyWebhookSignatureProps,
  SubscriptionProps,
  SubscribeReturns,
  WebhooksProps,
  Events,
  AnyObject,
  Truthy,
} from "../../types/classDefinition";
import axios from "axios";
import crypto from "crypto";

const MINED_TRANSACTION = "MINED_TRANSACTION";

/*
With this integration, we are only concerned with mined transactions from Alchemy. Therefore, the only subscribable event is MINED_TRANSACTION.
This integration only creates webhooks with { webhook_type: "MINED_TRANSACTIONS" }. Therefore, the exsistence of any webhook this class
creates implies that { events: ["MINED_TRANSACTIONS"] }.
*/
export default class AlchemyIntegration implements IntegrationClassI {
  id = "1234";
  name = "Alchemy";
  ALCHEMY_API_TOKEN = null;
  ALCHEMY_APP_ID = null;
  readonly client;

  constructor({
    ALCHEMY_API_TOKEN,
    ALCHEMY_APP_ID,
  }: {
    ALCHEMY_API_TOKEN: string;
    ALCHEMY_APP_ID: string;
  }) {
    this.ALCHEMY_API_TOKEN = ALCHEMY_API_TOKEN;
    this.ALCHEMY_APP_ID = ALCHEMY_APP_ID;

    this.client = axios.create({
      baseURL: "https://dashboard.alchemyapi.io/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "buildable",
        "X-Alchemy-Token": ALCHEMY_API_TOKEN,
      },
    });
  }

  async init({ webhookUrl }: InitProps): Promise<InitReturns> {
    const response = await this.client.post("/create-webhook", {
      webhook_type: MINED_TRANSACTION,
      app_id: this.ALCHEMY_APP_ID,
      webhook_url: webhookUrl,
    });

    if (response.status !== 200) {
      throw new Error(`Could not initialize Alchemy integration: ${response?.data?.message}`);
    }

    // We ignore events parameter and always init webhook with events: [MINED_TRANSACTION]
    return {
      webhookData: response.data.data,
      events: [MINED_TRANSACTION],
    };
  }

  verifyWebhookSignature({ request, signature, secret }: VerifyWebhookSignatureProps): Truthy {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(request.body, "utf8");
    const digest = hmac.digest("hex");

    if (signature === digest) {
      return true;
    } else {
      throw new Error("Invalid signature");
    }
  }

  async subscribe({ webhookId }: SubscriptionProps): Promise<SubscribeReturns> {
    try {
      const webhook: AnyObject = await this.getWebhooks({ webhookId });

      // We ignore events param and always return [MINED_TRANSACTION]
      return { webhook, events: [MINED_TRANSACTION] };
    } catch (e) {
      throw new Error(`Could not subscribe to new Alchemy events: ${e.message}`);
    }
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{ events: Events }> {
    // If unsubscribing from MINED_TRANSACTION, delete the webhook. Otherwise do nothing.
    if (events.includes(MINED_TRANSACTION)) {
      try {
        await this.deleteWebhookEndpoint({ webhookId });

        return { events: [] };
      } catch (e) {
        throw new Error(`Could not unsubscribe from Alchemy events: ${e.message}`);
      }
    } else {
      return { events: [MINED_TRANSACTION] };
    }
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const response = await this.client.get("/team-webhooks");

    if (response.status !== 200) {
      throw new Error(`Could not get Alchemy webhooks: ${response?.data?.message}`);
    }

    return webhookId ? response.data.data.find(({ id }) => id === webhookId) : response.data.data;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    // Subscribed events should always be [MINED_TRANSACTION], but we also get the webhook data
    // and return [webhook.webhook_type] to ensure the webhook exists
    return [webhook.webhook_type];
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    const response = await this.client.delete(`/delete-webhook?webhook_id=${webhookId}`);

    if (response.status !== 200) {
      throw new Error(`Could not delete Alchemy webhook: ${response?.data?.message}`);
    }

    return true;
  }

  async testConnection(): Promise<Truthy> {
    try {
      await this.getWebhooks({});

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Alchemy: ${err.message}`);
    }
  }
}
