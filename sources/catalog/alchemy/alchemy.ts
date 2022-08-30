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

export default class AlchemyIntegration implements IntegrationClassI {
  id: string = "1234";
  name: string = "Alchemy";
  ALCHEMY_API_TOKEN: string = null;
  ALCHEMY_APP_ID: string = null;
  ALCHEMY_ADDRESSES: string[] = null;
  ALCHEMY_TOKEN_IDS: { contract_address: string; token_id: string }[] = null;
  ALCHEMY_NETWORK: string = null;
  readonly client;

  constructor({
    ALCHEMY_API_TOKEN,
    ALCHEMY_APP_ID,
    ALCHEMY_ADDRESSES = "",
    ALCHEMY_TOKEN_IDS = "",
    ALCHEMY_NETWORK,
  }: {
    ALCHEMY_API_TOKEN: string;
    ALCHEMY_APP_ID: string;
    ALCHEMY_ADDRESSES?: string;
    ALCHEMY_TOKEN_IDS?: string;
    ALCHEMY_NETWORK?: string;
  }) {
    this.ALCHEMY_API_TOKEN = ALCHEMY_API_TOKEN;
    this.ALCHEMY_APP_ID = ALCHEMY_APP_ID;
    this.ALCHEMY_ADDRESSES = this.parseCommaSeperatedString(ALCHEMY_ADDRESSES);
    this.ALCHEMY_NETWORK = ALCHEMY_NETWORK;

    const trimmedTokenIds = this.parseCommaSeperatedString(ALCHEMY_TOKEN_IDS);
    if (trimmedTokenIds.length % 2 !== 0) {
      throw new Error("Failed to parse ALCHEMY_TOKEN_IDS as pairs of (contract_address, token_id)");
    }
    this.ALCHEMY_TOKEN_IDS = [];
    for (let i = 0; i < trimmedTokenIds.length; i += 2) {
      this.ALCHEMY_TOKEN_IDS.push({
        contract_address: trimmedTokenIds[i],
        token_id: trimmedTokenIds[i + 1],
      });
    }

    this.client = axios.create({
      baseURL: "https://dashboard.alchemyapi.io/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "buildable",
        "X-Alchemy-Token": ALCHEMY_API_TOKEN,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhookData = [];

    for (let i = 0; i < events.length; ++i) {
      const response = await this.client.post("/create-webhook", {
        webhook_type: events[i],
        ...(events[i] !== "NFT_ACTIVITY" ? { app_id: this.ALCHEMY_APP_ID } : {}),
        webhook_url: webhookUrl,
        ...(this.ALCHEMY_NETWORK ? { network: this.ALCHEMY_NETWORK } : {}),
        ...(events[i] === "ADDRESS_ACTIVITY" ? { addresses: this.ALCHEMY_ADDRESSES } : {}),
        ...(events[i] === "NFT_ACTIVITY" ? { nft_filters: this.ALCHEMY_TOKEN_IDS } : {}),
      });

      if (response.status !== 200) {
        throw new Error(`Could not initialize Alchemy integration: ${response?.data?.message}`);
      }

      webhookData.push(response.data.data);
    }

    return {
      webhookData,
      events,
    };
  }

  verifyWebhookSignature({ request, signature, secret }: VerifyWebhookSignatureProps): Truthy {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(request.body, "utf8");
    const digest = hmac.digest("hex");

    if (signature === digest) {
      return true;
    } else {
      throw new Error("Invalid signature");
    }
  }

  async subscribe({
    webhookIds,
    events,
    webhookUrl,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhooks = await this.getWebhooks({ webhookIds });

    const createdWebhooks = await this.init({ webhookUrl, events });

    const updatedWebhooks = webhooks.concat(createdWebhooks.webhookData);

    return {
      webhooks: updatedWebhooks,
      events: updatedWebhooks.map((webhook) => webhook.webhook_type),
    };
  }

  async unsubscribe({
    webhookIds,
    events,
  }: SubscriptionProps): Promise<{ events: Events; webhooks: AnyObject[] }> {
    const webhooks = await this.getWebhooks({ webhookIds });

    const webhooksIdsToDelete = webhooks
      .filter((webhook) => events.includes(webhook.webhook_type))
      .map((webhook) => webhook.id);

    await this.deleteWebhookEndpoint({ webhookIds: webhooksIdsToDelete });

    const updatedWebhooks = webhooks.filter((webhook) => !webhooksIdsToDelete.includes(webhook.id));

    return {
      webhooks: updatedWebhooks,
      events: updatedWebhooks.map((webhook) => webhook.webhook_type),
    };
  }

  async getWebhooks({ webhookIds }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const response = await this.client.get("/team-webhooks");

    if (response.status !== 200) {
      throw new Error(`Could not get Alchemy webhooks: ${response?.data?.message}`);
    }

    return webhookIds
      ? response.data.data.filter(({ id }) => webhookIds.includes(id))
      : response.data.data;
  }

  async getSubscribedEvents({ webhookIds }: WebhooksProps): Promise<Events> {
    const webhooks = <AnyObject[]>await this.getWebhooks({ webhookIds });

    return webhooks.map((webhook) => webhook.webhook_type);
  }

  async deleteWebhookEndpoint({ webhookIds, webhookId }: WebhooksProps): Promise<Truthy> {
    const webhookIdsToDelete = webhookIds ? webhookIds : [webhookId];
    for (const id of webhookIdsToDelete) {
      const response = await this.client.delete(`/delete-webhook?webhook_id=${id}`);

      if (response.status !== 200) {
        throw new Error(`Could not delete Alchemy webhook: ${response?.data?.message}`);
      }
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
      throw new Error(`Could not connect to Alchemy: ${err.message}`);
    }
  }

  private parseCommaSeperatedString(s: string): string[] {
    return s
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
  }
}
