import {
  Events,
  InitProps,
  IntegrationClassI,
  SubscribeReturns,
  Truthy,
} from "../../types/classDefinition";
import { verifyKey } from "discord-interactions";

interface DiscordIncomingWebhookI {
  webhookData: {
    webhookUrl: string;
  };
  events: Events;
}

export const DISCORD_WEBHOOK_WARNING = 'Discord does not support programmatically subscribing or unsubscribing to specific events.';
export const DISCORD_WEBHOOK_DELETE_ERROR = 'Discord does not support programmatically deleting a webhook endpoint.';
export const DISCORD_INVALID_SIGNATURE_ERROR = 'Invalid signature';

export default class DiscordIntegration implements IntegrationClassI {
  id: string;
  name: string;

  private readonly DISCORD_PUBLIC_KEY: string;
  private discordWebhookUrl: string;

  constructor({
    DISCORD_PUBLIC_KEY,
  }: {
    DISCORD_PUBLIC_KEY: string,
  }) {
    this.DISCORD_PUBLIC_KEY = DISCORD_PUBLIC_KEY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<DiscordIncomingWebhookI> {
    if (events.length > 0) {
      console.warn(DISCORD_WEBHOOK_WARNING);
    }
    this.discordWebhookUrl = webhookUrl
    return {
      webhookData: {
        webhookUrl
      },
      events: ["any"]
    };
  }

  verifyWebhookSignature({ request }): Truthy {
    const signature = request.headers["X-Signature-Ed25519"];
    const timestamp = request.headers["X-Signature-Timestamp"];
    if (!signature
      || !timestamp
      || !verifyKey(request.body, signature, timestamp, this.DISCORD_PUBLIC_KEY)
    ) {
      throw new Error(DISCORD_INVALID_SIGNATURE_ERROR);
    }

    return true;
  }

  async subscribe(): Promise<SubscribeReturns> {
    console.warn(DISCORD_WEBHOOK_WARNING);
    return {
      events: ["any"]
    }
  }

  async unsubscribe(): Promise<{ events: Events}> {
    console.warn(DISCORD_WEBHOOK_WARNING);
    return {
      events: ["any"]
    }
  }

  async getWebhooks(): Promise<DiscordIncomingWebhookI> {
    return {
      webhookData: {
        webhookUrl: this.discordWebhookUrl,
      },
      events: ["any"]
    };
  }

  async getSubscribedEvents(): Promise<Events> {
    return ["any"];
  }

  async deleteWebhookEndpoint(): Promise<Truthy> {
    throw new Error(DISCORD_WEBHOOK_DELETE_ERROR);
  }

  async testConnection(): Promise<Truthy> {
    // Since there is no API for webhook, always return true.
    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
