import { Client, Environment } from "square";
import crypto from 'crypto';
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
  DeleteWebhookEndpointProps,
} from "../../types/classDefinition";

export default class SquareIntegration implements IntegrationClassI {
  id = "sandbox-sq0idb-TFf_EmComK7MWat_w3hznQ";
  name = "Square";
  square: Client;

  readonly SQUARE_SECRET_KEY: string;

  constructor({ SQUARE_SECRET_KEY }: { SQUARE_SECRET_KEY: string }) {
    this.square = new Client({
      accessToken: SQUARE_SECRET_KEY,
      environment: Environment.Production,
    });

    this.SQUARE_SECRET_KEY =  SQUARE_SECRET_KEY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhook = await this.square.webhookSubscriptionsApi.createWebhookSubscription({
      subscription: {
        eventTypes: events,
        notificationUrl: webhookUrl,
      },
    });

    return {
      webhookData: webhook.result,
      events: webhook.result.subscription.eventTypes,
    };
  }

  verifyWebhookSignature({ request, signature, secret }: VerifyWebhookSignatureProps): Truthy {
    const { headers, body } = request;
    const webhookUrl = `${headers['x-forwarded-proto']}://${headers['x-forwarded-host']}${headers['x-matched-path']}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(webhookUrl + body);
    const hash = hmac.digest('base64');

    if(!(hash === signature)) throw new Error('Signature verification failed');

    return hash === signature;
  }

  async getWebhooks(): Promise<AnyObject | AnyObject[]> {
    const webhookEndpoint = await this.square.webhookSubscriptionsApi.listWebhookSubscriptions();

    return webhookEndpoint.result;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject =
      await this.square.webhookSubscriptionsApi.retrieveWebhookSubscription(webhookId);

    return webhook.result.subscription.eventTypes;
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.square.webhookSubscriptionsApi.deleteWebhookSubscription(webhookId);
      return true;
    } catch (error) {
      throw new Error((error as any).errors[0].detail);
    }
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterSubscribe = subscribedEvents.concat(events);

    const updatedWebhook = await this.square.webhookSubscriptionsApi.updateWebhookSubscription(
      webhookId,
      {
        subscription: {
          eventTypes: eventsAfterSubscribe,
        },
      },
    );

    return {
      webhook: updatedWebhook,
      events: updatedWebhook.result.subscription.eventTypes,
    };
  }

  async unsubscribe({
                      webhookId,
                      events,
                    }: SubscriptionProps): Promise<{ events: Events; webhook?: any; webhooks?: any }> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterUnsubscribe = subscribedEvents.filter(
      (event: string) => !events.includes(event),
    );

    if (!eventsAfterUnsubscribe.length) {
      await this.deleteWebhookEndpoint({ webhookId });

      return {
        events: [],
      };
    }

    const updatedWebhook = await this.square.webhookSubscriptionsApi.updateWebhookSubscription(
      webhookId,
      {
        subscription: {
          eventTypes: eventsAfterUnsubscribe,
        },
      },
    );

    return {
      webhook: updatedWebhook,
      events: updatedWebhook.result.subscription.eventTypes,
    };
  }

  async testConnection(): Promise<Truthy> {
    try {
      const data: any = await this.getWebhooks();
      if (data.status > 299) {
        throw new Error(`Square API returned status code ${data.status}`);
      }
      return {
        success: true,
        message: "Connection to Square Webhooks API is healthy",
      };
    } catch (e) {
      throw new Error("Unable to establish a connection with Square: " + (e as Error).message);
    }
  }
}
