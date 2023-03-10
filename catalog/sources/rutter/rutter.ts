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

  private RUTTER_CONNECTION: RutterConnection;

  constructor({
    RUTTER_EMAIL,
    RUTTER_PASSWORD,
  }: {
    RUTTER_EMAIL: string;
    RUTTER_PASSWORD: string;
  }) {
    this.RUTTER_EMAIL = RUTTER_EMAIL;
    this.RUTTER_PASSWORD = RUTTER_PASSWORD;

    this.RUTTER_CONNECTION = new RutterConnection(RUTTER_EMAIL, RUTTER_PASSWORD);
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    // initialize connection with Rutter
    this.RUTTER_CONNECTION = new RutterConnection(this.RUTTER_EMAIL, this.RUTTER_PASSWORD);
    await this.RUTTER_CONNECTION.init();

    // issue create a webhook
    await this.RUTTER_CONNECTION.createWebhook({ webhookUrl, events });

    // issue list webhooks
    const webhook = await this.RUTTER_CONNECTION.findWebhookByUrl(webhookUrl);

    // return webhook
    return {
      webhookData: webhook,
      events,
    };
  }

  async verifyWebhookSignature(props: VerifyWebhookSignatureProps): Promise<Truthy> {
    return Promise.resolve(undefined);
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhook = await this.RUTTER_CONNECTION.updateWebhookEvents(webhookId, events);

    return {
      webhook, events,
    };
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return this.RUTTER_CONNECTION.findWebhookById(webhookId);
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{ events: Events; webhook?: any; webhooks?: any }> {
    const webhook = await this.RUTTER_CONNECTION.findWebhookById(webhookId);
    const newEvents = webhook.allowlist.allowedTypes.filter((event: string) => !events.includes(event));

    await this.RUTTER_CONNECTION.updateWebhookEvents(webhookId, newEvents);

    return {
      webhook,
      events: newEvents,
    };
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    return this.RUTTER_CONNECTION.getSubscribedEvents(webhookId);
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    return this.RUTTER_CONNECTION.dropWebhook(webhookId);
  }

  async testConnection(): Promise<TestConnection> {
    await this.RUTTER_CONNECTION.init();

    return {
      success: true,
      message: "Connection to Rutter API established",
    };
  }
}
