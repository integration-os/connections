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

export default class AdyenIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    return {
      webhookData: {},
      events: [],
    };
  }

  verifyWebhookSignature({ signature: signature }: VerifyWebhookSignatureProps): Truthy {
    return true;
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    // return new webhooks
    return {
      webhook: {},
      events: [],
    };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    return {
      webhook: {},
      events: [],
    };
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return {};
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    return [];
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    return true;
  }

  async testConnection(): Promise<Truthy> {
    await this.client.get(`/`);

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
