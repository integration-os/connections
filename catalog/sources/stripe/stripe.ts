/**
 * Stripe.ts
 *
 * @description - Stripe integration for Buildable
 *
 * @author    Buildable Technologies Inc.
 * @license   MIT
 * @docs      https://stripe.com/docs/webhooks
 */

import Stripe from "stripe";
import { IntegrationClassI } from "../../../types/sourceClassDefinition";

export default class StripeIntegration implements IntegrationClassI {
  id = "intg_627aceaf971c67182d1d76ca";

  name = "Stripe";

  stripe: Stripe;

  constructor({ STRIPE_SECRET_KEY }: { STRIPE_SECRET_KEY: string }) {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });
  }

  async init({ webhookUrl, events }) {
    const webhook = await this.stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: events as any,
    });

    return {
      webhookData: webhook,
      events: webhook.enabled_events,
    };
  }

  async verifyWebhookSignature({ request, signature, secret }) {
    try {
      return this.stripe.webhooks.constructEvent(
        request.body,
        signature,
        secret,
      );
    } catch (err) {
      throw new Error("Unable to verify signature.");
    }
  }

  async subscribe({ webhookId, events }) {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterSubscribe = subscribedEvents.concat(events);

    const updatedWebhook = await this.stripe.webhookEndpoints.update(
      webhookId,
      {
        enabled_events: eventsAfterSubscribe as any,
      },
    );

    return {
      webhook: updatedWebhook,
      events: updatedWebhook.enabled_events,
    };
  }

  async unsubscribe({ webhookId, events }) {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterUnsubscribe = subscribedEvents.filter(
      (event: string) => !events.includes(event),
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
      },
    );

    return {
      events: updatedWebhook.enabled_events,
      webhook: updatedWebhook,
    };
  }

  async getWebhooks() {
    const webhookEndpoint = await this.stripe.webhookEndpoints.list();

    return webhookEndpoint?.data;
  }

  async getSubscribedEvents({ webhookId }) {
    const webhookEndpoint = await this.stripe.webhookEndpoints.retrieve(
      webhookId,
    );

    return webhookEndpoint.enabled_events;
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return this.stripe.webhookEndpoints.del(webhookId);
  }

  async testConnection() {
    try {
      // Test the connection by trying to list a charge
      await this.stripe.charges.list({ limit: 1 });

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      console.log((err as Error).message);
      throw new Error(
        `Unable to establish a connection with Stripe: ${
          (err as Error).message}`,
      );
    }
  }
}
