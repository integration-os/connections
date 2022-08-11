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

export default class PagerDutyIntegration implements IntegrationClassI {
  id = "1234";
  name = "PagerDuty";
  PAGERDUTY_API_TOKEN = null;
  PAGERDUTY_FILTER_TYPE = null;
  PAGERDUTY_FILTER_ID = null;
  readonly client;

  constructor({
    PAGERDUTY_API_TOKEN,
    PAGERDUTY_FILTER_TYPE,
    PAGERDUTY_FILTER_ID,
  }: {
    PAGERDUTY_API_TOKEN: string;
    PAGERDUTY_FILTER_TYPE: string;
    PAGERDUTY_FILTER_ID?: string;
  }) {
    this.PAGERDUTY_API_TOKEN = PAGERDUTY_API_TOKEN;
    this.PAGERDUTY_FILTER_TYPE = PAGERDUTY_FILTER_TYPE;
    this.PAGERDUTY_FILTER_ID = PAGERDUTY_FILTER_ID;

    this.client = axios.create({
      baseURL: "https://api.pagerduty.com/webhook_subscriptions",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Accept: "application/vnd.pagerduty+json;version=2",
        Authorization: `Token token=${PAGERDUTY_API_TOKEN}`,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const response = await this.client.post("", {
      webhook_subscription: {
        type: "webhook_subscription",
        delivery_method: {
          type: "http_delivery_method",
          url: webhookUrl,
        },
        events,
        filter: {
          type: this.PAGERDUTY_FILTER_TYPE,
          ...(this.PAGERDUTY_FILTER_TYPE === "account_reference"
            ? {}
            : {
                id: this.PAGERDUTY_FILTER_ID,
              }),
        },
      },
    });

    if (response.status !== 200) {
      throw new Error(`Could not initialize PagerDuty integration: ${response?.data?.message}`);
    }

    return {
      webhookData: response.data.webhook_subscription,
      events: response.data.webhook_subscription.events,
    };
  }

  verifyWebhookSignature({ request, signature, secret }: VerifyWebhookSignatureProps): Truthy {
    // The X-PagerDuty-Signature header included with each webhook event delivery contains one or more signatures.
    // Multiple signatures may be present to allow for a zero-downtime secret rotation.
    // The current signature version is v1 and is computed as an HMAC of the payload body using a SHA-256 hash function.
    // This is performed for each signing secret and the results are concatenated using comma separation. An example signature is shown below:
    // X-PagerDuty-Signature: v1=...,v1=...

    var expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("hex");

    var signatureWithVersion = "v1=" + expectedSignature;
    var signatureList = signature.split(",");

    if (signatureList.indexOf(signatureWithVersion) > -1) {
      return true;
    } else {
      throw new Error(`Invalid signature`);
    }
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    const newEventsList = Array.from(new Set([...webhook.events, ...events]));

    const response = await this.client.put(`/${webhookId}`, {
      webhook_subscription: { events: newEventsList },
    });

    if (response.status !== 200) {
      throw new Error(`Could not subscribe to new PagerDuty events: ${response?.data?.message}`);
    }

    return { webhook: response.data, events: response.data.webhook_subscription.events };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    const newEventsList = webhook.events.filter((event: string) => !events.includes(event));

    if (newEventsList.length === 0) {
      await this.deleteWebhookEndpoint({ webhookId });
      return { events: [] };
    } else {
      const response = await this.client.put(`/${webhookId}`, {
        webhook_subscription: { events: newEventsList },
      });

      if (response.status !== 200) {
        throw new Error(`Could not unsubscribe from PagerDuty events: ${response?.data?.message}`);
      }

      return { webhook: response.data, events: response.data.webhook_subscription.events };
    }
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const webhookResponse = await this.client.get(webhookId ? `/${webhookId}` : "");

    if (webhookResponse.status !== 200) {
      throw new Error(`Could not get PagerDuty webhooks: ${webhookResponse?.data?.message}`);
    }

    return webhookId
      ? webhookResponse.data.webhook_subscription
      : webhookResponse.data.webhook_subscriptions;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    return webhook.events;
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    const response = await this.client.delete(`/${webhookId}`);

    if (response.status !== 204) {
      throw new Error(`Could not delete PagerDuty webhook: ${response?.data?.message}`);
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
      throw new Error(`Could not connect to PagerDuty: ${err.message}`);
    }
  }
}
