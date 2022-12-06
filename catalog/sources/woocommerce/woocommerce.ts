import {
  AnyObject,
  DeleteWebhookEndpointProps,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  TestConnection,
  Truthy,
  VerifyWebhookSignatureProps,
  WebhooksProps,
} from "../../../types/sourceClassDefinition";
import axios, { AxiosInstance } from "axios";
import crypto from "crypto";

const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

export default class WooCommerceIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly client: AxiosInstance;
  private readonly WOOCOMMERCE_CUSTOMER_SECRET: string;

  constructor({
    WOOCOMMERCE_WP_URL,
    WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET,
  }: {
    WOOCOMMERCE_WP_URL: string;
    WOOCOMMERCE_CONSUMER_KEY: string;
    WOOCOMMERCE_CONSUMER_SECRET: string;
  }) {
    this.client = axios.create({
      baseURL: WOOCOMMERCE_WP_URL,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: `Basic ${Buffer.from(
          `${WOOCOMMERCE_CONSUMER_KEY.trim()}:${WOOCOMMERCE_CONSUMER_SECRET.trim()}`,
        )
          .toString("base64")
          .trim()}`,
      },
    });

    this.WOOCOMMERCE_CUSTOMER_SECRET = WOOCOMMERCE_CONSUMER_SECRET;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhooks: AnyObject[] = [];

    for (const event of events) {
      try {
        const startTime = Date.now();

        const webhook = await this.client
          .post("/wp-json/wc/v3/webhooks", {
            topic: event,
            delivery_url: webhookUrl,
            secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
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
      events: webhooks.map((webhook) => webhook.topic),
    };
  }

  async verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Promise<Truthy> {
    // WooCommerce sends the signed body in X-WC-Webhook-Signature header
    // it uses SHA256-HMAC hash encoded in base64
    // We're using the Rest API secret key for encryption, which is the default key used by WooCommerce
    secret = this.WOOCOMMERCE_CUSTOMER_SECRET;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("base64");

    if (hash !== signature) {
      throw new Error(`Invalid signature`);
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

    // fail if no webhook is returned, as there is no way to extract the URL
    if (!webhooks.length) {
      throw new Error("No webhook found");
    }

    // find events to subscribe to
    const eventList = webhooks.map((webhook) => webhook.topic);
    const eventsToSubscribe = events.filter(
      (event) => !eventList.includes(event),
    );

    const { delivery_url } = webhooks[0];

    for (const event of eventsToSubscribe) {
      try {
        const startTime = Date.now();

        const webhook = await this.client
          .post("/wp-json/wc/v3/webhooks", {
            topic: event,
            delivery_url: delivery_url,
            secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
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

    // return new webhooks
    return {
      webhooks: webhooks,
      events: webhooks.map((webhook) => webhook.topic),
    };
  }

  async unsubscribe({ webhookIds, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    // retrieve webhooks
    let webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    // find events to unsubscribe from
    const subscribedEvents = webhooks.map((webhook) => webhook.topic);
    const eventsToUnsubscribe = events.filter((event) =>
      subscribedEvents.includes(event),
    );

    // find webhooks to delete
    const webhooksToDelete = webhooks.filter((webhook) =>
      eventsToUnsubscribe.includes(webhook.topic),
    );

    // delete webhooks
    for (const webhook of webhooksToDelete) {
      const startTime = Date.now();

      await this.deleteWebhookEndpoint({ webhookId: webhook.id });

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < 500) {
        await sleep(500 - elapsedTime);
      }

      webhooks = webhooks.filter((wh) => wh.id !== webhook.id);
    }

    return {
      webhooks: webhooks,
      events: webhooks.map((webhook) => webhook.topic),
    };
  }

  async getWebhooks({
    webhookIds,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const webhooks: AnyObject[] = [];

    for (const webhookId of webhookIds) {
      try {
        const webhook = await this.client
          .get(`/wp-json/wc/v3/webhooks/${webhookId}`)
          .then((response) => {
            return response.data;
          });

        webhooks.push(webhook);
      } catch (error) {
        console.log(
          `Unable to retrieve webhook ${webhookId}: ${error.message}`,
        );
      }
    }

    return webhooks;
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];
    const events = webhooks.map((webhook) => webhook.topic);

    // Deduplicate events
    return Array.from(new Set(events));
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.client.delete(
        `/wp-json/wc/v3/webhooks/${webhookId}?force=true`,
      );
      return true;
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error(`Webhook with ID ${webhookId} not found`);
      }

      throw error;
    }
  }

  async testConnection(): Promise<TestConnection> {
    await this.client.get("/wp-json/wc/v3/webhooks");

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
