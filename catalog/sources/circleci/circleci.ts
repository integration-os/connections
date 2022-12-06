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

import crypto from "crypto";
import axios from "axios";

export default class CircleCIIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly CIRCLECI_API_KEY: string;
  CIRCLECI_PROJECT_ID: string;
  CIRCLECI_WEBHOOK_NAME: string;

  readonly client;

  constructor({
    CIRCLECI_PERSONAL_API_KEY,
    CIRCLECI_PROJECT_ID,
  }: {
    CIRCLECI_PERSONAL_API_KEY: string;
    CIRCLECI_PROJECT_ID: string;
  }) {
    this.client = axios.create({
      baseURL: "https://circleci.com/api/v2/webhook",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        "Circle-Token": CIRCLECI_PERSONAL_API_KEY,
      },
    });

    this.CIRCLECI_API_KEY = CIRCLECI_PERSONAL_API_KEY;
    this.CIRCLECI_PROJECT_ID = CIRCLECI_PROJECT_ID;
    this.CIRCLECI_WEBHOOK_NAME = `buildable-${this.randomHex()}`;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const response = await this.client.post("", {
      name: this.CIRCLECI_WEBHOOK_NAME,
      url: webhookUrl,
      events: events,
      scope: {
        id: this.CIRCLECI_PROJECT_ID,
        type: "project",
      },
      "verify-tls": true,
      "signing-secret": this.CIRCLECI_API_KEY,
    });

    if (response.status !== 201) {
      throw new Error(
        `Could not initialize CircleCI integration: ${response.data.message}`,
      );
    }

    const webhookData = response.data;

    return {
      webhookData: webhookData,
      events: webhookData.events,
    };
  }

  async verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Promise<Truthy> {
    // CircleCI webhook signature is available in 'circleci-signature' header
    // The headers contains comma separated list of hashes as follows:
    //      v1=<hash>, v2=<hash>, v3=<hash>, etc...
    // As the time of writing this code, the latest and only version is v1
    // and is a HMAC-SHA256, hex encoded value

    secret = this.CIRCLECI_API_KEY;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("hex");

    // get the latest signature, according to CircleCI versioning
    // const split = signature.split(",");
    // const pureSignature = split[split.length - 1].trim().split("=")[1];

    // get v1 signature (HMAC-SHA256)
    const pureSignature = signature.split("v1=")[1].trim().split(",")[0].trim();

    if (hash !== pureSignature) {
      throw new Error(`Invalid signature`);
    }

    return true;
  }

  async subscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    const newEventsList = Array.from(new Set([...webhook.events, ...events]));

    const response = await this.client.put(`/${webhookId}`, {
      events: newEventsList,
    });

    if (response.status !== 200) {
      throw new Error(
        `Could not subscribe to new events: ${response.data.message}`,
      );
    }

    return {
      webhook: response.data,
      events: newEventsList,
    };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    let webhook: AnyObject = await this.getWebhooks({ webhookId });

    const newEventsList = webhook.events.filter(
      (event: string) => !events.includes(event),
    );

    if (newEventsList.length === 0) {
      await this.deleteWebhookEndpoint({ webhookId });
    } else {
      const response = await this.client.put(`/${webhookId}`, {
        events: newEventsList,
      });

      if (response.status !== 200) {
        throw new Error(
          `Could not unsubscribe to new events: ${response.data.message}`,
        );
      }

      webhook = response.data;
    }

    return {
      webhook: webhook,
      events: newEventsList,
    };
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const response = await this.client.get(`/${webhookId}`);
      return response.data;
    } catch (e) {
      if (e.response) {
        throw new Error(
          `Could not get CircleCI webhooks: ${e.response.data.message}`,
        );
      }

      throw new Error(`Could not get CircleCI webhooks: ${e.message}`);
    }
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    return webhook.events;
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    const response = await this.client.delete(`/${webhookId}`);

    if (response.status !== 200) {
      throw new Error(
        `Could not delete CircleCI webhook: ${response.data.message}`,
      );
    }

    return true;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.client.get("", {
        params: {
          "scope-id": this.CIRCLECI_PROJECT_ID,
          "scope-type": "project",
        },
      });

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to CircleCI: ${err.message}`);
    }
  }

  // helper functions
  private randomHex(): string {
    return Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  }
}
