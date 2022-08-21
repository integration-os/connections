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
      baseURL: WOOCOMMERCE_WP_URL,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: `Basic ${Buffer.from(
          `${WOOCOMMERCE_CUSTOMER_KEY.trim()}:${WOOCOMMERCE_CUSTOMER_SECRET.trim()}`,
        )
          .toString("base64")
          .trim()}`,
      },
    });

    this.WOOCOMMERCE_CUSTOMER_SECRET = WOOCOMMERCE_CUSTOMER_SECRET;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const registeredEvents: string[] = [];

    let webhookData: AnyObject[] = await Promise.all(
      events.map((event) =>
        this.client
          .post("/wp-json/wc/v3/webhooks", {
            topic: event,
            delivery_url: webhookUrl,
            secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
          })
          .then((response) => {
            registeredEvents.push(event);
            return response.data;
          })
          .catch((error) => {
            console.log(`Unable to create webhook for event ${event}: ${error.message}`);

            return null;
          }),
      ),
    );

    return {
      webhookData: webhookData.filter((webhook) => webhook !== null),
      events: registeredEvents,
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

    const eventList = webhooks.map((webhook) => webhook.topic);

    const eventsToSubscribe = events.filter((event) => !eventList.includes(event));

    let newWebhooks: AnyObject[];
    let subscribedEvents: string[] = [];

    if (eventsToSubscribe.length !== 0) {
      const { delivery_url } = webhooks[0];

      newWebhooks = await Promise.all(
        eventsToSubscribe.map((event) =>
          this.client
            .post("/wp-json/wc/v3/webhooks", {
              topic: event,
              delivery_url,
              secret: this.WOOCOMMERCE_CUSTOMER_SECRET,
            })
            .then((response) => {
              subscribedEvents.push(event);
              return response.data;
            })
            .catch((error) => {
              console.log(`Unable to create webhook for event ${event}: ${error.message}`);

              return null;
            }),
        ),
      );
    }

    // return new webhooks
    return {
      webhooks: [...webhooks, ...newWebhooks.filter((webhook) => webhook !== null)],
      events: [...eventList, ...subscribedEvents],
    };
  }

  async unsubscribe({ webhookIds, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    // retrieve webhooks
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    // find events to unsubscribe from
    const subscribedEvents = webhooks.map((webhook) => webhook.topic);
    const eventsToUnsubscribe = events.filter((event) => subscribedEvents.includes(event));

    // find webhooks to delete
    const webhooksToDelete = webhooks.filter((webhook) =>
      eventsToUnsubscribe.includes(webhook.topic),
    );

    // delete webhooks (unsubscribe)
    return await Promise.all(
      webhooksToDelete.map((webhook) => {
        return this.deleteWebhookEndpoint({ webhookId: webhook.id }).then(() => {
          return {
            webhook: webhook,
            event: webhook.topic,
          };
        });
      }),
    ).then((results) => {
      const unsubscribedWebhooks = results
        .map((result) => result.webhook)
        .filter((webhook) => webhook !== undefined);

      const unsubscribedEvents = results
        .map((result) => result.event)
        .filter((event) => event !== undefined);

      return {
        webhooks: webhooks.filter((webhook) => !unsubscribedWebhooks.includes(webhook)),
        events: subscribedEvents.filter((event) => !unsubscribedEvents.includes(event)),
      };
    });
  }

  getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return Promise.all(
      webhookIds.map((webhookId: string) =>
        this.client
          .get(`/wp-json/wc/v3/webhooks/${webhookId}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            const baseMessage = `Unable to retrieve webhook with ID ${webhookId}`;
            console.log(`${baseMessage}: ${error.message}`);

            return null;
          }),
      ),
    ).then((webhooks) => webhooks.filter((webhook) => webhook !== null));
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];
    const events = webhooks.map((webhook) => webhook.topic);

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
