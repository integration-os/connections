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

import crypto from "crypto";
import axios from "axios";

export default class ZendeskIntegration implements IntegrationClassI {
  id: string;
  name: string;

  private readonly ZENDESK_ACCESS_TOKEN = null;
  private readonly ZENDESK_SUBDOMAIN_NAME = null;
  private ZENDESK_WEBHOOK_SECRET: string | undefined = null;
  private webhookUrl: string | undefined = undefined;
  

  readonly client;

  constructor({ 
    ZENDESK_SUBDOMAIN_NAME,
    ZENDESK_ACCESS_TOKEN,
    ZENDESK_WEBHOOK_SECRET
  }: { 
    ZENDESK_SUBDOMAIN_NAME: string;
    ZENDESK_ACCESS_TOKEN: string;
    ZENDESK_WEBHOOK_SECRET?: string;
  }) {
    this.ZENDESK_SUBDOMAIN_NAME = ZENDESK_SUBDOMAIN_NAME;
    this.ZENDESK_ACCESS_TOKEN = ZENDESK_ACCESS_TOKEN;

    this.ZENDESK_WEBHOOK_SECRET = ZENDESK_WEBHOOK_SECRET ? ZENDESK_WEBHOOK_SECRET : null;
    
    this.client = axios.create({
      baseURL: `https://${ZENDESK_SUBDOMAIN_NAME}.zendesk.com/api/v2/webhooks`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        "Authorization": `Bearer ${this.ZENDESK_ACCESS_TOKEN}`,
      },
    });
  }

  async init({ webhookUrl }: InitProps): Promise<InitReturns> {
    const response = await this.client.post("", {
      webhook:{
        endpoint: webhookUrl,
        http_method: "POST",
        name: `buildable-${this.randomHex()}`,
        status: "active",
        request_format: "json",
        subscriptions: ["conditional_ticket_events"],
      }
    });

    if (response.status !== 201) {
      throw new Error(`Could not initialize Zendesk integration: ${response?.errors?.detail}`);
    }


    this.webhookUrl = webhookUrl;

    return {
      webhookData: response.data.webhook,
      events: ["conditional_ticket_events"],
    };
  }

  verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Truthy {
    // Zendesk Webhook Verification is done by signing the body and signature timestamp 
    // with the webhook secret key using SHA256, then base64 encoding the resulting digest.
    // Represented simply: base64(HMACSHA256(TIMESTAMP + BODY))
    // The signing secret key can either be defined in app requirements for all webhooks 
    // or created for each new webhook, in that case it has to be retrieved through Zendesk API. 
    const timestamp = request.headers["x-zendesk-webhook-signature-timestamp"];
    
    if (!!this.ZENDESK_WEBHOOK_SECRET) {
      return this.isValidSignature(this.ZENDESK_WEBHOOK_SECRET, signature, request.body, timestamp)
    }

    return this.getSigningSecret({ webhookId: request.headers["x-zendesk-webhook-id"]}).then((webhook_secret) => this.isValidSignature(webhook_secret, signature, request.body, timestamp))
  }

  async subscribe({ webhookId }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhook = await this.getWebhooks({ webhookId });

    

    return {
      webhook: webhook,
      events: ["conditional_ticket_events"],
    };
  }

  async unsubscribe({ webhookId }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhook = await this.deleteWebhookEndpoint({ webhookId });

    return {
      webhook: webhook,
      events: [],
    };
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const response = await this.client.get(webhookId ? `/${webhookId}` : "");
    
    if (response.status !== 200) {
      throw new Error(`Could not get Zendesk webhooks: ${response?.data?.errors?.title}`);
    }
  
    return webhookId ? response.data.webhook : response.data.webhooks;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    // Check if the webhook exists
    await this.getWebhooks({ webhookId });

    return ["conditional_ticket_events"];
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    const webhook = await this.getWebhooks({ webhookId });
    const response = await this.client.delete(`/${webhookId}`);

    if (response.status !== 204) {
      throw new Error(
        `Could not delete Zendesk webhook: ${response?.errors?.title}`
      );
    }

    return webhook;
  }

  async testConnection(): Promise<Truthy> {
    try {
      await this.getWebhooks({});

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Zendesk: ${err.message}`);
    }
  }

//  API call to retrieve signing secret for a webhook (Only needed if signing_secret was not defined in app requirements)
private async getSigningSecret({ webhookId }: WebhooksProps): Promise<String> {
  const response = await this.client.get(`/${webhookId}/signing_secret`);
    
  if (response.status !== 200) {
    throw new Error(`Could not get Zendesk webhook signing secret: ${response?.data?.errors?.title}`);
  }

  return response.data.signing_secret.secret;
 }

// Helper function for verifying webhook signature
 private isValidSignature(secret, signature, body, timestamp): Truthy {
  
  const hash = crypto
    .createHmac("sha256", secret)
    .update(timestamp+body)
    .digest("base64");

  if (hash !== signature) {
    throw new Error(`Invalid signature`);
  }

  return true;
}

  // helper functions
  private randomHex(): string {
    return Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  }
}
