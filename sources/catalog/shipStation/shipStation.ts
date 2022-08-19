import axios, { AxiosInstance, AxiosResponse } from "axios";

import {
  AnyObject,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  Truthy,
  WebhooksProps,
} from "../../types/classDefinition";

type ShipStationWebhook = {
  IsLabelAPIHook: boolean;
  WebHookID: number;
  SellerID: number;
  StoreID?: number;
  HookType: string;
  MessageFormat: string;
  Url: string;
  Name?: string;
  BulkCopyBatchID?: number;
  BulkCopyRecordID?: number;
  Active: boolean;
  WebhookLogs?: any[];
  Seller?: string;
  Store?: string;
};

type ShipStationWehbookList = {
  webhooks: ShipStationWebhook[];
};

export default class StripeIntegration implements IntegrationClassI {
  id = "intg_627aceaf971c67182d1d76ca";
  name = "ShipStation";

  private readonly SHIP_STATION_URL: string;
  private readonly SHIP_STATION_API_KEY: string;
  private readonly SHIP_STATION_SECRET_KEY: string;

  private readonly client: AxiosInstance;

  constructor({
    SHIP_STATION_URL,
    SHIP_STATION_API_KEY,
    SHIP_STATION_SECRET_KEY,
  }: {
    SHIP_STATION_URL: string;
    SHIP_STATION_API_KEY: string;
    SHIP_STATION_SECRET_KEY: string;
  }) {
    this.SHIP_STATION_URL = SHIP_STATION_URL;
    this.SHIP_STATION_API_KEY = SHIP_STATION_API_KEY;
    this.SHIP_STATION_SECRET_KEY = SHIP_STATION_SECRET_KEY;

    const authToken = Buffer.from(
      `${this.SHIP_STATION_API_KEY}:${this.SHIP_STATION_SECRET_KEY}`,
    ).toString("base64");

    this.client = axios.create({
      baseURL: this.SHIP_STATION_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "buildable",
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookCreateRequests = events.map((event) =>
      this.client.post(`/webhooks/subscribe`, {
        target_url: webhookUrl,
        event: event,
      }),
    );
    const webhookCreateResponses = await Promise.allSettled(webhookCreateRequests);
    const webhooks = webhookCreateResponses
      .filter((response) => response.status === "fulfilled")
      .map((response) => (response as PromiseFulfilledResult<AxiosResponse>).value.data);
    const registeredEvents = webhooks.map((webhook) => webhook.triggerType);

    return {
      webhookData: webhooks,
      events: registeredEvents,
    };
  }

  verifyWebhookSignature({ request, signature, secret }): Truthy {
    // ShipStation doesn't have a way to verify the signature so we can just return true
    return true;
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = ((webhooks as unknown as ShipStationWehbookList)?.webhooks).map(
      (webhook) => webhook.HookType,
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
    const { webhooks } = (await this.getWebhooks({
      webhookIds,
    })) as ShipStationWehbookList;

    if (!webhooks?.length) {
      return { events: [], webhooks: [] };
    }

    const webhooksIdsToDelete = webhooks
      .filter((webhook) => events.includes(webhook.HookType))
      .map((webhook) => `${webhook.WebHookID}`);
    const webhooksIdsToDeleteRequests = webhooksIdsToDelete.map((id) =>
      this.deleteWebhookEndpoint({ webhookId: id }),
    );
    await Promise.all(webhooksIdsToDeleteRequests);

    const updatedWebhooks = webhooks.filter(
      (webhook) => !webhooksIdsToDelete.includes(`${webhook.WebHookID}`),
    );
    const updatedEvents = updatedWebhooks.map((webhook) => webhook.HookType);

    return {
      events: updatedEvents,
      webhooks: updatedWebhooks,
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const { data } = await this.client.get<null, AxiosResponse<ShipStationWehbookList>>(
        `/webhooks`,
      );
      const webhooks = data?.webhooks || [];

      if (!webhookIds?.length) {
        return webhooks;
      }

      return webhooks.filter((webhook) => webhookIds.includes(`${webhook.WebHookID}`));
    } catch (error) {
      throw new Error(`Could not get Webflow webhooks: ${error.message}`);
    }
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const { webhooks } = (await this.getWebhooks({ webhookIds })) as ShipStationWehbookList;

    if (!webhooks.length) {
      return [];
    }

    return webhooks.map((webhook) => webhook.HookType);
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    try {
      await this.client.delete(`/webhooks/${webhookId}`);
      return true;
    } catch (error) {
      throw new Error(`Could not delete ShipStation webhook: ${error.message}`);
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
      throw new Error(`Unable to establish a connection with ShipStation: ${error.message}`);
    }
  }
}
