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
  TestConnection,
} from "../../../types/sourceClassDefinition";

type WebflowWebook = {
  _id: string;
  triggerType: string;
  triggerId: string;
  url: string;
  site: string;
  filter?: Record<string, any>;
  lastUsed?: string;
  createdOn: string;
};

type WebflowSite = {
  _id: string;
  createdOn: string;
  name: string;
  shortName: string;
  lastPublished?: string;
  previewUrl?: string;
  timezone: string;
  database: string;
};

export default class WebflowIntegration implements IntegrationClassI {
  id = "159753";

  name = "Webflow";

  private readonly WEBFLOW_BASE_URL = null;

  private readonly WEBFLOW_API_TOKEN = null;

  private readonly WEBFLOW_VERSION = "1.0.0";

  private webflowSiteId?: string;

  private readonly client: AxiosInstance;

  constructor({
    WEBFLOW_BASE_URL,
    WEBFLOW_API_TOKEN,
  }: {
    WEBFLOW_BASE_URL: string;
    WEBFLOW_API_TOKEN: string;
  }) {
    this.WEBFLOW_BASE_URL = WEBFLOW_BASE_URL;
    this.WEBFLOW_API_TOKEN = WEBFLOW_API_TOKEN;

    this.client = axios.create({
      baseURL: this.WEBFLOW_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "event-inc",
        Authorization: `Bearer ${this.WEBFLOW_API_TOKEN}`,
        "accept-version": this.WEBFLOW_VERSION,
      },
    });
  }

  /**
   * Helper function to get site id for the given API KEY/TOKEN
   * Each site has its own generated API Key
   * Site id is needed for other Webflow API calls
   * @returns
   */
  private async getWebflowSiteId(): Promise<string> {
    try {
      if (this.webflowSiteId) {
        return this.webflowSiteId;
      }

      const webflowSites = (await this.client.get<WebflowSite[]>("/sites"))
        .data;

      if (!webflowSites?.length) {
        throw new Error("Can not get Webflow site id");
      }

      this.webflowSiteId = webflowSites[0]._id;
      return this.webflowSiteId;
    } catch (error) {
      throw new Error(`Can not get Webflow site id: ${error.message}`);
    }
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const siteId = await this.getWebflowSiteId();

    const webhookCreateRequests = events.map((event) => this.client.post(`/sites/${siteId}/webhooks`, {
      triggerType: event,
      url: `${webhookUrl}?event=${event}`,
    }));
    const webhookCreateResponses = await Promise.allSettled(
      webhookCreateRequests,
    );
    const webhooks = webhookCreateResponses
      .filter((response) => response.status === "fulfilled")
      .map(
        // eslint-disable-next-line no-undef
        (response) => (response as PromiseFulfilledResult<AxiosResponse<WebflowWebook>>)
          .value.data,
      );
    const registeredEvents = webhooks.map((webhook) => webhook.triggerType);

    return {
      webhookData: webhooks,
      events: registeredEvents,
    };
  }

  /**
   * Webflow doesn't have a way to verify the signature, so we can just return true
   * @param props
   * @returns
   */
  async verifyWebhookSignature(
    props: VerifyWebhookSignatureProps,
  ): Promise<Truthy> {
    return true;
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = (webhooks as WebflowWebook[]).map(
      (webhook) => webhook.triggerType,
    );
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
    const webhooksIdsToDeleteResults = await Promise.allSettled(
      webhooksIdsToDeleteRequests,
    );
    const deletedWebhookIds = webhooksIdsToDeleteResults
      .filter((result) => result.status === "fulfilled")
      // eslint-disable-next-line no-undef
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    const updatedWebhooks = webhooks.filter(
      (webhook) => !deletedWebhookIds.includes(webhook._id),
    );
    const updatedEvents = updatedWebhooks.map((webhook) => webhook.triggerType);

    return {
      events: updatedEvents,
      webhooks: updatedWebhooks,
    };
  }

  async getWebhooks({
    webhookIds,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const siteId = await this.getWebflowSiteId();
      const { data } = await this.client.get<
        null,
        AxiosResponse<WebflowWebook[]>
      >(`/sites/${siteId}/webhooks`);
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
    const webhooks = (await this.getWebhooks({
      webhookIds,
    })) as WebflowWebook[];

    if (!webhooks.length) {
      return [];
    }

    return webhooks.map((webhook) => webhook.triggerType);
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    try {
      const siteId = await this.getWebflowSiteId();
      await this.client.delete(`/sites/${siteId}/webhooks/${webhookId}`);
      return true;
    } catch (error) {
      throw new Error(`Could not delete Webflow webhook: ${error.message}`);
    }
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.getWebhooks({});

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (error) {
      throw new Error(
        `Unable to establish a connection with Webflow: ${error.message}`,
      );
    }
  }
}
