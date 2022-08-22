import axios, { AxiosInstance, AxiosResponse } from "axios";

import {
  IntegrationClassI,
  InitProps,
  InitReturns,
  SubscriptionProps,
  SubscribeReturns,
  WebhooksProps,
  Events,
  AnyObject,
  Truthy,
  VerifyWebhookSignatureProps,
} from "../../types/classDefinition";

type WebflowWebook = {
  _id: string;
  triggerType: string;
  triggerId: string;
  site: string;
  filter?: Record<string, any>;
  lastUsed: string;
  createdOn: string;
};

export default class WebflowIntegration implements IntegrationClassI {
  id = "159753";
  name = "Webflow";

  private readonly WEBFLOW_BASE_URL = null;
  private readonly WEBFLOW_API_TOKEN = null;
  private readonly WEBFLOW_SITE_ID = null;
  private readonly WEBFLOW_VERSION = null;

  private readonly DEFAULT_WEBFLOW_VERSION = "1.0.0";

  private readonly client: AxiosInstance;

  constructor({
    WEBFLOW_BASE_URL,
    WEBFLOW_API_TOKEN,
    WEBFLOW_SITE_ID,
    WEBFLOW_VERSION,
  }: {
    WEBFLOW_BASE_URL: string;
    WEBFLOW_API_TOKEN: string;
    WEBFLOW_SITE_ID: string;
    WEBFLOW_VERSION?: string;
  }) {
    this.WEBFLOW_BASE_URL = WEBFLOW_BASE_URL;
    this.WEBFLOW_API_TOKEN = WEBFLOW_API_TOKEN;
    this.WEBFLOW_SITE_ID = WEBFLOW_SITE_ID;
    this.WEBFLOW_VERSION = WEBFLOW_VERSION || this.DEFAULT_WEBFLOW_VERSION;

    this.client = axios.create({
      baseURL: this.WEBFLOW_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "buildable",
        Authorization: `Bearer ${this.WEBFLOW_API_TOKEN}`,
        "accept-version": this.WEBFLOW_VERSION,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookCreateRequests = events.map((event) =>
      this.client.post(`/sites/${this.WEBFLOW_SITE_ID}/webhooks?event=${event}`, {
        triggerType: event,
        url: webhookUrl,
      }),
    );
    const webhookCreateResponses = await Promise.allSettled(webhookCreateRequests);
    const webhooks = webhookCreateResponses
      .filter((response) => response.status === "fulfilled")
      .map(
        (response) => (response as PromiseFulfilledResult<AxiosResponse<WebflowWebook>>).value.data,
      );
    const registeredEvents = webhooks.map((webhook) => webhook.triggerType);

    return {
      webhookData: webhooks,
      events: registeredEvents,
    };
  }

  verifyWebhookSignature(props: VerifyWebhookSignatureProps): Truthy {
    // Webflow doesn't have a way to verify the signature so we can just return true
    return true;
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = (webhooks as WebflowWebook[]).map((webhook) => webhook.triggerType);
    const newEvents = events.filter((e) => !subscribedEvents.includes(e));

    const updatedWebhoks = webhooks;
    const updatedEvents = subscribedEvents;

    if (newEvents.length) {
      const newWebhooks = await this.init({ webhookUrl, events: newEvents });

      updatedWebhoks.push(...(newWebhooks.webhookData as AnyObject[]));
      updatedEvents.push(...newWebhooks.events);
    }

    return {
      webhooks: updatedWebhoks,
      events: updatedEvents,
    };
  }

  async unsubscribe({
    webhookIds,
    events,
  }: SubscriptionProps): Promise<{ events: Events; webhooks: any }> {
    const webhooks = (await this.getWebhooks({
      webhookIds,
    })) as WebflowWebook[];

    if (!webhooks.length) {
      return { events: [], webhooks: [] };
    }

    const webhooksIdsToDelete = webhooks
      .filter((webhook) => events.includes(webhook.triggerType))
      .map((webhook) => webhook._id);
    const webhooksIdsToDeleteRequests = webhooksIdsToDelete.map(async (id) => {
      await this.deleteWebhookEndpoint({ webhookId: id });

      return id;
    });
    const webhooksIdsToDeleteResults = await Promise.allSettled(webhooksIdsToDeleteRequests);
    const deletedWebhookIds = webhooksIdsToDeleteResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    const updatedWebhooks = webhooks.filter((webhook) => !deletedWebhookIds.includes(webhook._id));
    const updatedEvents = updatedWebhooks.map((webhook) => webhook.triggerType);

    return {
      events: updatedEvents,
      webhooks: updatedWebhooks,
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const { data } = await this.client.get<null, AxiosResponse<WebflowWebook[]>>(
        `/sites/${this.WEBFLOW_SITE_ID}/webhooks`,
      );
      const webhooks = data || [];

      if (!webhookIds?.length) {
        return webhooks;
      }

      return webhooks.filter((webhook) => webhookIds.includes(webhook._id));
    } catch (error) {
      throw new Error(`Could not get Webflow webhooks: ${error.message}`);
    }
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as WebflowWebook[];

    if (!webhooks.length) {
      return [];
    }

    return webhooks.map((webhook) => webhook.triggerType);
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    try {
      await this.client.delete(`/sites/${this.WEBFLOW_SITE_ID}/webhooks/${webhookId}`);
      return true;
    } catch (error) {
      throw new Error(`Could not delete Webflow webhook: ${error.message}`);
    }
  }

  async testConnection(): Promise<Truthy> {
    try {
      await this.getWebhooks({});

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (error) {
      throw new Error(`Unable to establish a connection with Webflow: ${error.message}`);
    }
  }
}
