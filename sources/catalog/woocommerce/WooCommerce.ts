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
    WOOCOMMERCE_CUSTOMER_KEY,
    WOOCOMMERCE_CUSTOMER_SECRET,
  }: {
    WOOCOMMERCE_WP_URL: string;
    WOOCOMMERCE_CUSTOMER_KEY: string;
    WOOCOMMERCE_CUSTOMER_SECRET: string;
  }) {
    this.client = axios.create({
      url: WOOCOMMERCE_WP_URL,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: Buffer.from(
          `${WOOCOMMERCE_CUSTOMER_KEY.trim()}:${WOOCOMMERCE_CUSTOMER_SECRET.trim()}`,
        )
          .toString("base64")
          .trim(),
      },
    });

    this.WOOCOMMERCE_CUSTOMER_SECRET = WOOCOMMERCE_CUSTOMER_SECRET;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookData: AnyObject[] = await Promise.all(
      events.map(async (event) => {
        const response = await this.client.post("https://mysite.local/wp-json/wc/v3/webhooks", {
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
    // We're using the Rest API secret key for encryption, which is the default key used by WooCommerce

    const hash = crypto.createHmac("sha256", secret).update(request.body, "utf8").digest("base64");

    if (hash !== signature) {
      throw new Error(`Invalid signature`);
    }

    return true;
  }

  async subscribe({ webhookIds, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks: AnyObject[] = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = webhooks.map((webhook) => webhook.topic);

    const eventsToSubscribe = events.filter((event) => !subscribedEvents.includes(event));

    let newWebhooks: AnyObject[];

    if (eventsToSubscribe.length !== 0) {
      const { delivery_url } = webhooks[0];

      newWebhooks = await Promise.all(
        eventsToSubscribe.map(async (event) => {
          const response = await this.client.post(
            "/wp-json/wc/v3/webhooks",
            {
              topic: event,
              delivery_url,
              secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
            },
            {},
          );

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

    const subscribedEvents = webhooks.map((webhook) => webhook.topic);
    const eventsToUnsubscribe = events.filter((event) => subscribedEvents.includes(event));

    if (eventsToUnsubscribe.length !== 0) {
      const webhooksToDelete = webhooks.filter((webhook) =>
        eventsToUnsubscribe.includes(webhook.topic),
      );

      for (const webhook of webhooksToDelete) {
        await this.deleteWebhookEndpoint({ webhookId: webhook.id });
      }
    }

    // return new webhooks
    return {
      webhooks: webhooks.filter((webhook) => !eventsToUnsubscribe.includes(webhook.topic)),
      events: subscribedEvents.filter((event) => !eventsToUnsubscribe.includes(event)),
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return await Promise.all(
      webhookIds.map(async (webhookId: string) => {
        try {
          const response = await this.client.get(`/wp-json/wc/v3/webhooks/${webhookId}`);
          return response.data;
        } catch (error) {
          if (error.response.status === 404) {
            throw new Error(`Webhook with ID ${webhookId} not found`);
          }

          throw error;
        }
      }),
    );
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const events: string[] = await Promise.all(
      webhookIds.map(async (webhookId) => {
        const response = await this.client.get(`/wp-json/wc/v3/webhooks/${webhookId}`);

        return response.data.topic;
      }),
    );

    // Deduplicate events
    return Array.from(new Set(events));
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.client.delete(`/wp-json/wc/v3/webhooks/${webhookId}?force=true`);
      return true;
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error(`Webhook with ID ${webhookId} not found`);
      }

      throw error;
    }
  }

  async testConnection(): Promise<Truthy> {
    await this.client.get("/wp-json/wc/v3/webhooks");

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
