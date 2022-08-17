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

type WebFlowTriggerType =
  | "form_submission"
  | "site_publish"
  | "ecomm_new_order"
  | "ecomm_order_changed"
  | "ecomm_inventory_changed"
  | "memberships_user_account_added"
  | "memberships_user_account_updated"
  | "collection_item_created"
  | "collection_item_changed"
  | "collection_item_deleted"
  | "collection_item_unpublished";

type WebflowWebook = {
  _id: string;
  triggerType: WebFlowTriggerType;
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
    const webhookCreateRequests = events.map((e) =>
      this.client.post(`/sites/${this.WEBFLOW_SITE_ID}/webhooks`, {
        triggerType: e,
        url: webhookUrl,
      }),
    );
    const webhookCreateResponses = await Promise.all(webhookCreateRequests);
    const webhooks = webhookCreateResponses.map((r) => r.data);

    return {
      webhookData: webhooks,
      events,
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

    const subscribedEvents = (webhooks as WebflowWebook[]).map(
      (webhook) => webhook.triggerType as string,
    );
    const newEvents = events.filter((e) => !subscribedEvents.includes(e));
    const newWebhooks = await this.init({ webhookUrl, events: newEvents });

    const updateWebhoks = webhooks.concat(newWebhooks.webhookData as AnyObject[]);
    const updateEvents = subscribedEvents.concat(newWebhooks.events);

    return {
      webhooks: updateWebhoks,
      events: updateEvents,
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
    const webhooksIdsToDeleteRequests = webhooksIdsToDelete.map((id) =>
      this.deleteWebhookEndpoint({ webhookId: id }),
    );
    await Promise.all(webhooksIdsToDeleteRequests);

    const updatedWebhooks = webhooks.filter(
      (webhook) => !webhooksIdsToDelete.includes(webhook._id),
    );
    const updatedEvents = updatedWebhooks.map((webhook) => webhook.triggerType);

    return {
      events: updatedEvents,
      webhooks: updatedWebhooks,
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const response = await this.client.get<null, AxiosResponse<WebflowWebook[]>>(
        `/sites/${this.WEBFLOW_SITE_ID}/webhooks`,
      );
      const webhooks = response?.data || [];

      if (!webhookIds?.length) {
        return webhooks;
      }

      return webhooks.filter((webhook) => webhookIds.includes(webhook._id));
    } catch (error) {
      throw new Error(`Could not get Webflow webhooks: ${error.message}`);
    }
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = await this.getWebhooks({ webhookIds });
    const webflowWebooks = webhooks as WebflowWebook[];

    if (!webflowWebooks?.length) {
      return [];
    }

    return webflowWebooks.map((webhook) => webhook.triggerType);
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
