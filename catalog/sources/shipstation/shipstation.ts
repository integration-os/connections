import axios, { AxiosInstance, AxiosResponse } from "axios";

import {
  AnyObject,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  TestConnection,
  Truthy,
  WebhooksProps,
} from "../../../types/sourceClassDefinition";

type ShipStationWebhookSubscribeResponse = { id: number };

type ShipStationWebhookSubscribeRequest = {
  target_url: string;
  event: string;
};

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

type ShipStationWebhookList = {
  webhooks: ShipStationWebhook[];
};

type ShipStationWebhookInternal = Omit<ShipStationWebhook, "WebHookID"> & {
  WebHookID: string;
};

export default class ShipStationIntegration implements IntegrationClassI {
  id = "123456";
  name = "ShipStation";

  private readonly SHIP_STATION_BASE_URL: string;
  private readonly SHIP_STATION_API_KEY: string;
  private readonly SHIP_STATION_SECRET_KEY: string;

  private readonly client: AxiosInstance;

  constructor({
    SHIP_STATION_BASE_URL,
    SHIP_STATION_API_KEY,
    SHIP_STATION_SECRET_KEY,
  }: {
    SHIP_STATION_BASE_URL: string;
    SHIP_STATION_API_KEY: string;
    SHIP_STATION_SECRET_KEY: string;
  }) {
    this.SHIP_STATION_BASE_URL = SHIP_STATION_BASE_URL;
    this.SHIP_STATION_API_KEY = SHIP_STATION_API_KEY;
    this.SHIP_STATION_SECRET_KEY = SHIP_STATION_SECRET_KEY;

    const authToken = Buffer.from(
      `${this.SHIP_STATION_API_KEY}:${this.SHIP_STATION_SECRET_KEY}`,
    ).toString("base64");

    this.client = axios.create({
      baseURL: this.SHIP_STATION_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "buildable",
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookCreateRequests = events.map(async (event) =>
      this.client.post<
        ShipStationWebhookSubscribeRequest,
        AxiosResponse<ShipStationWebhookSubscribeResponse>
      >(`/webhooks/subscribe`, {
        target_url: webhookUrl,
        event: event,
      }),
    );
    const webhookCreateResults = await Promise.allSettled(
      webhookCreateRequests,
    );

    const createdWebhooks = webhookCreateResults
      .filter((response) => response.status === "fulfilled")
      .map(
        (response) =>
          (
            response as PromiseFulfilledResult<
              AxiosResponse<ShipStationWebhookSubscribeResponse>
            >
          ).value.data,
      );
    const createdWebhookIds = createdWebhooks.map(
      (createdWebhook) => `${createdWebhook.id}`,
    );

    // Get created webhooks data coz return modules from `subscribe` and `getWebhoks` aren't the same
    // So the have a unified structure
    const webhooksData = (await this.getWebhooks({
      webhookIds: createdWebhookIds,
    })) as ShipStationWebhookInternal[];
    const registeredEvents = webhooksData.map((webhook) => webhook.HookType);

    return {
      webhookData: webhooksData,
      events: registeredEvents,
    };
  }

  async verifyWebhookSignature({
    request,
    signature,
    secret,
  }): Promise<Truthy> {
    // ShipStation doesn't have a way to verify the signature so we can just return true
    return true;
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = (await this.getWebhooks({ webhookIds })) as AnyObject[];

    const subscribedEvents = (
      webhooks as unknown as ShipStationWebhookInternal[]
    ).map((webhook) => webhook.HookType);
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
    })) as ShipStationWebhookInternal[];

    if (!webhooks?.length) {
      return { events: [], webhooks: [] };
    }

    const webhooksIdsToDelete = webhooks
      .filter((webhook) => events.includes(webhook.HookType))
      .map((webhook) => webhook.WebHookID);
    const webhooksIdsToDeleteRequests = webhooksIdsToDelete.map(async (id) => {
      await this.deleteWebhookEndpoint({ webhookId: id });

      return id;
    });
    const webHooksDeleteResults = await Promise.allSettled(
      webhooksIdsToDeleteRequests,
    );
    const deletedWebhooksIds = webHooksDeleteResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    const updatedWebhooks = webhooks.filter(
      (webhook) => !deletedWebhooksIds.includes(webhook.WebHookID),
    );
    const updatedEvents = updatedWebhooks.map((webhook) => webhook.HookType);

    return {
      events: updatedEvents,
      webhooks: updatedWebhooks,
    };
  }

  async getWebhooks({
    webhookIds,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const { data } = await this.client.get<
        null,
        AxiosResponse<ShipStationWebhookList>
      >(`/webhooks`);
      const webhooksList = data?.webhooks || [];
      const webhooks = webhooksList.map((webhook) => {
        const webhookInternal: ShipStationWebhookInternal = {
          ...webhook,
          WebHookID: `${webhook.WebHookID}`,
        };
        return webhookInternal;
      });

      if (!webhookIds?.length) {
        return webhooks;
      }

      return webhooks.filter((webhook) =>
        webhookIds.includes(webhook.WebHookID),
      );
    } catch (error) {
      throw new Error(`Could not get ShipStation webhooks: ${error.message}`);
    }
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = (await this.getWebhooks({
      webhookIds: webhookIds.map(String),
    })) as ShipStationWebhookInternal[];

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
      throw new Error(
        `Could not delete ShipStation webhook: ${
          error.response?.data
            ? JSON.stringify(error.response?.data)
            : error.message
        }`,
      );
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
        `Unable to establish a connection with ShipStation: ${error.message}`,
      );
    }
  }
}
