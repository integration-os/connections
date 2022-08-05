import Stripe from "stripe";
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

export default class StripeIntegration implements IntegrationClassI {
  id = "intg_627aceaf971c67182d1d76ca";
  name = "Stripe";
  stripe: Stripe;

  constructor({ STRIPE_SECRET_KEY }: { STRIPE_SECRET_KEY: string }) {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhook = await this.stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: events as any,
    });

    return {
      webhookData: webhook,
      events: webhook.enabled_events,
    };
  }

  verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Truthy {
    try {
      return this.stripe.webhooks.constructEvent(
        request.body,
        signature,
        secret
      );
    } catch (err) {
      throw new Error("Unable to verify signature.");
    }
  }

  async subscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterSubscribe = subscribedEvents.concat(events);

    const updatedWebhook = await this.stripe.webhookEndpoints.update(
      webhookId,
      {
        enabled_events: eventsAfterSubscribe as any,
      }
    );

    return {
      webhook: updatedWebhook,
      events: updatedWebhook.enabled_events as string[],
    };
  }

  async unsubscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterUnsubscribe = subscribedEvents.filter(
      (event: string) => !events.includes(event)
    );

    // If there are no events left, delete the webhook
    if (eventsAfterUnsubscribe.length === 0) {
      await this.deleteWebhookEndpoint({ webhookId });

      return {
        events: [],
      };
    }

    const updatedWebhook = await this.stripe.webhookEndpoints.update(
      webhookId,
      {
        enabled_events: eventsAfterUnsubscribe as any,
      }
    );

    return {
      events: updatedWebhook.enabled_events,
      webhook: updatedWebhook,
    };
  }

  async getWebhooks(): Promise<AnyObject | AnyObject[]> {
    const webhookEndpoint = await this.stripe.webhookEndpoints.list();

    return webhookEndpoint?.data;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhookEndpoint = await this.stripe.webhookEndpoints.retrieve(
      webhookId
    );

    return webhookEndpoint.enabled_events;
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    return await this.stripe.webhookEndpoints.del(webhookId);
  }

  async testConnection(): Promise<Truthy> {
    try {
      // Test the connection by trying to list a charge
      await this.stripe.charges.list({ limit: 1 });

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error("Unable to establish a connection with Stripe.");
    }
  }
}
