import crypto from "crypto";
import axios from "axios";
import {
  AnyObject, DeleteWebhookEndpointProps,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI, SubscribeReturns, SubscriptionProps, TestConnection,
  Truthy, VerifyWebhookSignatureProps, WebhooksProps,
} from "../../../types/sourceClassDefinition";
import RutterConnection from "./lib/connection";

export default class RutterIntegration implements IntegrationClassI {
  id: string;

  name: string;

  private readonly RUTTER_EMAIL: string;

  private readonly RUTTER_PASSWORD: string;

  private readonly RUTTER_CLIENT_SECRET: string;

  private RUTTER_CONNECTION: RutterConnection;

  constructor({
    RUTTER_EMAIL,
    RUTTER_PASSWORD,
    RUTTER_CLIENT_SECRET,
  }: {
    RUTTER_EMAIL: string;
    RUTTER_PASSWORD: string;
    RUTTER_CLIENT_SECRET: string;
  }) {
    this.RUTTER_EMAIL = RUTTER_EMAIL;
    this.RUTTER_PASSWORD = RUTTER_PASSWORD;
    this.RUTTER_CLIENT_SECRET = RUTTER_CLIENT_SECRET;

    this.RUTTER_CONNECTION = new RutterConnection(RUTTER_EMAIL, RUTTER_PASSWORD);
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    // initialize connection with Rutter
    try {
      this.RUTTER_CONNECTION = new RutterConnection(this.RUTTER_EMAIL, this.RUTTER_PASSWORD);
      await this.RUTTER_CONNECTION.init();

      // issue create a webhook
      await this.RUTTER_CONNECTION.createWebhook({ webhookUrl, events });

      // issue list webhooks
      const webhook = await this.RUTTER_CONNECTION.findWebhookByUrl(webhookUrl);

      // return webhook
      return {
        webhookData: webhook,
        events: webhook.allowlist.allowedTypes,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async verifyWebhookSignature({ request, signature }: VerifyWebhookSignatureProps): Promise<Truthy> {
    const secret = this.RUTTER_CLIENT_SECRET;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("base64");

    if (`sha256=${hash}` !== signature) {
      throw new Error("Invalid signature");
    }

    return true;
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    try {
      const webhook = await this.RUTTER_CONNECTION.updateWebhookEvents(webhookId, events);

      return {
        webhook,
        events: webhook.allowlist.allowedTypes,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      return this.RUTTER_CONNECTION.findWebhookById(webhookId);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{ events: Events; webhook?: any; webhooks?: any }> {
    try {
      const webhook = await this.RUTTER_CONNECTION.findWebhookById(webhookId);
      const newEvents = webhook.allowlist.allowedTypes.filter((event: string) => !events.includes(event));

      const newWebhook = await this.RUTTER_CONNECTION.updateWebhookEvents(webhookId, newEvents);

      return {
        webhook: newWebhook,
        events: newWebhook.allowlist.allowedTypes,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    try {
      return this.RUTTER_CONNECTION.getSubscribedEvents(webhookId);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      return this.RUTTER_CONNECTION.dropWebhook(webhookId);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(`Rutter API Error: ${JSON.stringify((e.response.data as any).errors)}`);
      }

      throw new Error(`An unexpected error occurred: ${e.message}`);
    }
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.RUTTER_CONNECTION.init();

      return {
        success: true,
        message: "Connection to Rutter API established",
      };
    } catch (e) {
      console.log(e.message);
      return {
        success: false,
        message: `Connection to Rutter API failed: ${e.message}`,
      };
    }
  }
}
