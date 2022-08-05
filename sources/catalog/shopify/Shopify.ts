import { Shopify, ApiVersion, DataType } from "@shopify/shopify-api";
import crypto from "crypto";
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
  DeleteWebhookEndpointProps,
} from "../../types/classDefinition";

const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

export default class ShopifyIntegration implements IntegrationClassI {
  id = "intg_6296661448d9214b8e446de2";
  name = "Shopify";
  shopify: any;
  API_BASE_PATH: string;
  SHOPIFY_API_SECRET_KEY: string;

  constructor({
    SHOPIFY_STORE_URL,
    SHOPIFY_ACCESS_TOKEN,
    SHOPIFY_API_SECRET_KEY,
  }: {
    SHOPIFY_STORE_URL: string;
    SHOPIFY_ACCESS_TOKEN: string;
    SHOPIFY_API_SECRET_KEY: string;
  }) {
    this.shopify = new Shopify.Clients.Rest(
      SHOPIFY_STORE_URL,
      SHOPIFY_ACCESS_TOKEN
    );

    this.SHOPIFY_API_SECRET_KEY = SHOPIFY_API_SECRET_KEY;
    this.API_BASE_PATH = `/admin/api/${ApiVersion.April22}`;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhooks = [];

    for (const event of events) {
      try {
        const startTime = Date.now();

        console.log("creating webhook for: ", event);

        const data = await this.shopify.post({
          path: `${this.API_BASE_PATH}/webhooks.json`,
          data: {
            webhook: {
              topic: event,
              address: webhookUrl,
              format: "json",
            },
          },
          type: DataType.JSON,
        });

        const elapsedTime = Date.now() - startTime;

        // Shopify limits requests to 1 / 30 second
        if (elapsedTime < 500) {
          await sleep(500 - elapsedTime);
        }

        webhooks.push(data?.body?.webhook);
      } catch (e) {
        console.error(e);
      }
    }

    const eventsResult = webhooks.map((webhook) => webhook.topic);

    return {
      webhookData: webhooks,
      events: eventsResult,
    };
  }

  verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Truthy {
    secret = this.SHOPIFY_API_SECRET_KEY;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("base64");

    if (hash !== signature) {
      throw new Error("Unable to verify signature.");
    }

    return true;
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = await this.getWebhooks({
      webhookIds,
    });

    const createdWebhooks = await this.init({
      webhookUrl,
      events,
    });

    const updatedWebhooks = webhooks.concat(createdWebhooks.webhookData);

    return {
      webhooks: updatedWebhooks as AnyObject[],
      events: updatedWebhooks.map((webhook) => webhook.topic) as string[],
    };
  }

  async unsubscribe({
    webhookIds,
    events,
  }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhooks = await this.getWebhooks({
      webhookIds,
    });

    const webhooksIdsToDelete = webhooks
      .filter((webhook) => events.includes(webhook.topic))
      .map((webhook) => webhook.id);

    for (const wid of webhooksIdsToDelete) {
      const startTime = Date.now();

      await this.deleteWebhookEndpoint({
        webhookId: wid,
      });

      const elapsedTime = Date.now() - startTime;

      // Shopify limits requests to 1 / 30 second
      if (elapsedTime < 500) {
        await sleep(500 - elapsedTime);
      }
    }

    const updatedWebhooks = webhooks.filter(
      (webhook) => !webhooksIdsToDelete.includes(webhook.id)
    );

    return {
      webhooks: updatedWebhooks,
      events: updatedWebhooks.map((webhook) => webhook.topic),
    };
  }

  async getWebhooks({
    webhookIds,
  }: WebhooksProps): Promise<AnyObject | AnyObject[]> {
    const getAllWebhooks = async (nextPageInfo, webhooks) => {
      const query: {
        limit: number;
        page_info?: string;
      } = {
        limit: 249,
      };

      if (nextPageInfo) query.page_info = nextPageInfo;

      const startTime = Date.now();

      const data = await this.shopify.get({
        path: `${this.API_BASE_PATH}/webhooks.json`,
        query,
      });

      const elapsedTime = Date.now() - startTime;

      // Shopify limits requests to 1 / 30 second
      if (elapsedTime < 500) {
        await sleep(500 - elapsedTime);
      }

      if (!data.pageInfo.nextPage) {
        return webhooks.concat(data.body.webhooks);
      }

      return await getAllWebhooks(
        data.pageInfo.nextPage.query.page_info,
        webhooks.concat(data.body.webhooks)
      );
    };

    const webhooks = await getAllWebhooks(null, []);

    return webhooks.filter((webhook) => webhookIds.includes(webhook.id));
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = await this.getWebhooks({
      webhookIds,
    });

    const events = webhooks.map((webhook) => webhook.topic);

    return events;
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    const startTime = Date.now();

    await this.shopify.delete({
      path: `${this.API_BASE_PATH}/webhooks/${webhookId}.json`,
      data: {
        webhook_id: webhookId,
      },
      type: DataType.JSON,
    });

    const elapsedTime = Date.now() - startTime;

    // Shopify limits requests to 1 / 30 second
    if (elapsedTime < 500) {
      await sleep(500 - elapsedTime);
    }

    return true;
  }

  async testConnection(): Promise<Truthy> {
    try {
      // Test the connection by trying to list webhooks
      await this.shopify.get({
        path: `${this.API_BASE_PATH}/webhooks.json`,
      });

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error("Unable to establish a connection with Shopify.");
    }
  }
}
