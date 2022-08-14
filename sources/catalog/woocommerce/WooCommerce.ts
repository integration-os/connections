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
} from "../../types/classDefinition";
import axios, { AxiosInstance } from "axios";
import crypto from "crypto";

export default class WooCommerceIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly client: AxiosInstance;
  private readonly WOOCOMMERCE_CUSTOMER_SECRET: string;

  constructor({
    WOOCOMMERCE_WP_URL,
    WOOCOMMERCE_CUSTOMER_SECRET,
    WOOCOMMERCE_CUSTOMER_KEY,
  }: {
    WOOCOMMERCE_WP_URL: string;
    WOOCOMMERCE_CUSTOMER_KEY: string;
    WOOCOMMERCE_CUSTOMER_SECRET: string;
  }) {
    this.client = axios.create({
      url: WOOCOMMERCE_WP_URL,
      auth: {
        username: WOOCOMMERCE_CUSTOMER_KEY,
        password: WOOCOMMERCE_CUSTOMER_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
      },
    });

    this.WOOCOMMERCE_CUSTOMER_SECRET = WOOCOMMERCE_CUSTOMER_KEY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookData: AnyObject[] = await Promise.all(
      events.map(async (event) => {
        const response = await this.client.post("/wp-json/wc/v3/webhooks", {
          topic: event,
          delivery_url: webhookUrl,
          secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
        });

        return response.data;
      }),
    );

    return {
      webhookData,
      events,
    };
  }

  verifyWebhookSignature({ request, signature, secret }: VerifyWebhookSignatureProps): Truthy {
    // WooCommerce sends the signed body in X-WC-Webhook-Signature header
    // it uses SHA256-HMAC hash encoded in base64
    secret = this.WOOCOMMERCE_CUSTOMER_SECRET;

    const hash = crypto.createHmac("sha256", secret).update(request.body, "utf8").digest("base64");

    return hash === signature;
  }

  async subscribe({ webhookIds, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks: AnyObject[] = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = webhooks.map((webhook) => webhook.event);

    const eventsToSubscribe = events.filter((event) => !subscribedEvents.includes(event));

    let newWebhooks: AnyObject[];

    if (eventsToSubscribe.length !== 0) {
      const { delivery_url } = webhooks[0];

      newWebhooks = await Promise.all(
        eventsToSubscribe.map(async (event) => {
          const response = await this.client.post("/wp-json/wc/v3/webhooks", {
            topic: event,
            delivery_url,
            secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
          });

          return response.data;
        }),
      );
    }

    // return new webhooks
    return {
      webhooks: [...webhooks, ...newWebhooks],
      events: [...subscribedEvents, ...eventsToSubscribe],
    };
  }

  async unsubscribe({ webhookIds, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];
    const subscribedEvents = webhooks.map((webhook) => webhook.event);
    const eventsToUnsubscribe = events.filter((event) => subscribedEvents.includes(event));

    let webhooksToDelete = [];

    if (eventsToUnsubscribe.length !== 0) {
      const webhooksToDelete = webhooks.filter((webhook) =>
        eventsToUnsubscribe.includes(webhook.event),
      );

      for (const webhook of webhooksToDelete) {
        await this.deleteWebhookEndpoint({ webhookId: webhook.id });
      }
    }

    // return new webhooks
    return {
      webhooks: webhooks.filter(
        (webhook) =>
          !webhooksToDelete.map((deletedWebhook) => deletedWebhook.id).includes(webhook.id),
      ),
      events: subscribedEvents.filter((event) => !eventsToUnsubscribe.includes(event)),
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return await Promise.all(
      webhookIds.map(async (webhookId: string) => {
        const response = await this.client.get(`/wp-json/wc/v3/webhooks/${webhookId}`);

        return response.data;
      }),
    );
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const events: string[] = await Promise.all(
      webhookIds.map(async (webhookId) => {
        const response = await this.client.get(`/wp-json/wc/v3/webhooks/${webhookId}`);

        return response.data.event;
      }),
    );

    return Array.from(new Set(events));
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    await this.client.delete(`/wp-json/wc/v3/webhooks/${webhookId}`);

    return true;
  }

  async testConnection(): Promise<Truthy> {
    await this.client.get("/wp-json/wc/v3/webhooks");

    return {
      success: true,
      message: "Connection to GitHub Webhooks API is healthy",
    };
  }
}
