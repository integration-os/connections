import axios, { AxiosInstance } from "axios";
import {
  AnyObject,
  DeleteWebhookEndpointProps,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  Truthy,
  VerifyWebhookSignatureProps,
  WebhooksProps,
  TestConnection,
} from "../../../types/sourceClassDefinition";

const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

export default class AdyenIntegration implements IntegrationClassI {
  id: string;

  name: string;

  readonly client: AxiosInstance;

  private readonly ADYEN_API_KEY: string;

  private readonly ADYEN_VERIFICATION_USERNAME: string;

  private readonly ADYEN_VERIFICATION_PASSWORD: string;

  constructor({
    ADYEN_COMPANY_ID,
    ADYEN_API_KEY,
    ADYEN_VERIFICATION_USERNAME,
    ADYEN_VERIFICATION_PASSWORD,
  }: {
    ADYEN_COMPANY_ID: string;
    ADYEN_API_KEY: string;
    ADYEN_VERIFICATION_USERNAME: string;
    ADYEN_VERIFICATION_PASSWORD: string;
  }) {
    this.client = axios.create({
      baseURL: `https://management-test.adyen.com/v1/companies/${ADYEN_COMPANY_ID}/webhooks`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "event-inc",
        "X-API-Key": ADYEN_API_KEY,
      },
    });

    this.ADYEN_API_KEY = ADYEN_API_KEY;
    this.ADYEN_VERIFICATION_USERNAME = ADYEN_VERIFICATION_USERNAME;
    this.ADYEN_VERIFICATION_PASSWORD = ADYEN_VERIFICATION_PASSWORD;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhooks: AnyObject[] = [];

    for (const event of events) {
      try {
        const startTime = Date.now();

        const webhook = await this.client
          .post("", {
            active: true,
            communicationFormat: "json",
            filterMerchantAccountType: "allAccounts",
            type: event,
            url: `${webhookUrl}?event=${event}`,
            username: this.ADYEN_VERIFICATION_USERNAME,
            password: this.ADYEN_VERIFICATION_PASSWORD,
          })
          .then((response) => response.data);

        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 500) {
          await sleep(500 - elapsedTime);
        }

        webhooks.push(webhook);
      } catch (error) {
        console.log(
          `Unable to create webhook for event ${event}: ${error.message}`,
        );
      }
    }

    return {
      webhookData: webhooks,
      events: webhooks.map((webhook) => webhook.type),
    };
  }

  async verifyWebhookSignature({
    request,
    signature,
  }: VerifyWebhookSignatureProps): Promise<Truthy> {
    const secret = Buffer.from(
      `${this.ADYEN_VERIFICATION_USERNAME}:${this.ADYEN_VERIFICATION_PASSWORD}`,
    ).toString("base64");

    const verificationSignature = signature
      ? signature.split("Basic")[1].trim()
      : (request.headers as any).authorization.split("Basic")[1].trim();

    if (secret !== verificationSignature) {
      throw new Error("Invalid signature");
    }

    return true;
  }

  async subscribe({
    webhookIds,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks: AnyObject[] = (await this.getWebhooks({
      webhookIds,
    })) as AnyObject[];

    // find list of events to subscribe to
    const subscribedEvents = webhooks.map((webhook) => webhook.type);
    const eventsToSubscribe = events.filter(
      (event) => !subscribedEvents.includes(event),
    );

    // subscribe to events
    const { url } = webhooks[0];
    const { webhookData: newWebhooks, events: newEvents } = await this.init({
      webhookUrl: url,
      events: eventsToSubscribe,
    });

    // return new webhook/events list
    return {
      webhooks: [...webhooks, ...(newWebhooks as AnyObject[])],
      events: [...subscribedEvents, ...newEvents],
    };
  }

  async unsubscribe({ webhookIds, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhooks: AnyObject[] = (await this.getWebhooks({
      webhookIds,
    })) as AnyObject[];

    // find webhooks to delete
    const subscribedEvents = webhooks.map((webhook) => webhook.type);
    const eventsToUnsubscribe = events.filter((event) => subscribedEvents.includes(event));

    const webhooksToDelete = webhooks.filter((webhook) => eventsToUnsubscribe.includes(webhook.type));

    // delete webhooks
    const deletedWebhooks = [];

    for (const webhook of webhooksToDelete) {
      await this.client
        .delete(`/${webhook.id}`)
        .then(() => deletedWebhooks.push(webhook));
    }

    // return final webhooks/events list
    return {
      webhooks: webhooks.filter(
        (webhook) => !deletedWebhooks.includes(webhook),
      ),
      events: subscribedEvents.filter(
        (event) => !deletedWebhooks.map((webhook) => webhook.type).includes(event),
      ),
    };
  }

  async getWebhooks({
    webhookIds,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const allWebhooks = await this.client
      .get("")
      .then((response) => response.data.data);
    return allWebhooks.filter((webhook) => webhookIds.includes(webhook.id));
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = await this.getWebhooks({ webhookIds });

    return Array.from(new Set(webhooks.map((webhook) => webhook.type)));
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.client.delete(`/${webhookId}`);
      return true;
    } catch (error) {
      const message = `Unable to delete webhook id ${webhookId}: ${error.message}`;
      console.log(message);

      throw new Error(message);
    }
  }

  async testConnection(): Promise<TestConnection> {
    await this.client.get("");

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
