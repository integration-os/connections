import axios, { AxiosInstance } from "axios";
import crypto from "crypto";
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
  TestConnection,
} from "../../../types/sourceClassDefinition";

// eslint-disable-next-line no-shadow
enum EventType {
  accounts = "accounts",
  issuing = "issuing",
  cardPayout = "card_payout",
  marketplace = "marketplace",
  gateway = "gateway",
  dispute = "dispute",
  fincrime = "fincrime",
}

type WorkflowConditionEvents = {
  [key in EventType]: string[];
};

interface WorkflowCondition {
  id: string;
  type: string;
  events: WorkflowConditionEvents;
}

export default class CheckoutIntegration implements IntegrationClassI {
  id: string;

  name: string;

  private readonly apiKeySecret: string;

  private readonly environment: string = "sandbox";

  private readonly webhookSignKey: string;

  private readonly checkout: AxiosInstance;

  constructor({
    CHECKOUT_API_KEY_SECRET,
  }: {
    CHECKOUT_API_KEY_SECRET: string;
  }) {
    this.apiKeySecret = CHECKOUT_API_KEY_SECRET;
    this.webhookSignKey = this.apiKeySecret;
    this.environment =
      this.apiKeySecret.indexOf("sk_sbox") === 0 ? "sandbox" : "production";
    const baseURL =
      this.environment === "sandbox"
        ? "https://api.sandbox.checkout.com/workflows/"
        : "https://api.checkout.com/workflows/";

    this.checkout = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "event-inc",
        Authorization: `Bearer ${this.apiKeySecret}`,
      },
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const workflowConditions = this.eventsToWorkflowConditions(events);
    try {
      const webhooks = await this.checkout.post("/", {
        name: "Buildable",
        active: true,
        conditions: [
          {
            type: "event",
            events: workflowConditions,
          },
        ],
        actions: [
          {
            type: "webhook",
            url: webhookUrl,
            signature: {
              method: "HMACSHA256",
              key: this.webhookSignKey,
            },
          },
        ],
      });

      return {
        webhookData: {
          id: webhooks.data.id,
        },
        events,
      };
    } catch (error) {
      throw new Error(
        `Something went wrong while initializing webhook: ${error.message}`,
      );
    }
  }

  // Checkout.com Webhook signature is available in the "Cko-Signature" header
  async verifyWebhookSignature({
    request,
    signature,
  }: VerifyWebhookSignatureProps): Promise<Truthy> {
    const hash = crypto
      .createHmac("sha256", this.webhookSignKey)
      .update(request.body, "utf8")
      .digest("hex");

    if (hash !== signature) {
      throw new Error("Invalid Signature");
    }

    return true;
  }

  async subscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    try {
      const webhook = await this.getWebhooks({ webhookId });
      const eventsCondition =
        CheckoutIntegration.getWebhookEventsCondition(webhook);
      const webhookEvents = webhook.events;
      const newEventsList = Array.from(new Set([...webhookEvents, ...events]));
      const newConditions = this.eventsToWorkflowConditions(newEventsList);

      await this.checkout.put(
        `/${webhookId}/conditions/${eventsCondition.id}`,
        {
          type: "event",
          events: newConditions,
        },
      );

      return {
        webhook: { id: webhookId },
        events: newEventsList,
      };
    } catch (error) {
      throw new Error(`Could not subscribe to new events: ${error.message}`);
    }
  }

  async unsubscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    try {
      const webhook = await this.getWebhooks({ webhookId });
      const webhookEvents = webhook.events;
      const eventsCondition =
        CheckoutIntegration.getWebhookEventsCondition(webhook);
      const newEventsList = webhookEvents.filter(
        (event) => !events.includes(event),
      );
      const newConditions = this.eventsToWorkflowConditions(newEventsList);

      await this.checkout.put(
        `/${webhookId}/conditions/${eventsCondition.id}`,
        {
          type: "event",
          events: newConditions,
        },
      );

      return {
        webhook: { id: webhookId },
        events: newEventsList,
      };
    } catch (error) {
      throw new Error(`Could not unsubscribe from events: ${error.message}`);
    }
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    try {
      const webhook = await this.getWebhooks({ webhookId });
      return webhook.events;
    } catch (error) {
      throw new Error(`Error getting subscribed events: ${error.message}`);
    }
  }

  async getWebhooks({ webhookId }: WebhooksProps): Promise<AnyObject> {
    try {
      const response = await this.checkout.get(`/${webhookId}`);
      return this.parseWorkflowConditions(response.data);
    } catch (err) {
      throw new Error(`Error retrieving webhooks: ${err.message}`);
    }
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.checkout.delete(`/${webhookId}`);
      return true;
    } catch (err) {
      throw new Error(`Error deleting webhook: ${err.message}`);
    }
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.checkout.get("/");
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Error connecting to checkout.com API: ${err.message}`);
    }
  }

  /**
   *
   * Checkout workflows can have four different groups of events:
   * Gateway, Platforms, Dispute, FinCrime
   *
   * To make this compatible with Buildable's flat event type, we
   * expect events to have the format {event_type}.{event_name},
   * and in this method we do the de-normalization.
   *
   * So the Checkout.com Gateway event "payment_paid" becomes
   * "gateway.payment_paid" in Buildable
   *
   */
  private eventsToWorkflowConditions(events: Events): WorkflowConditionEvents {
    const workflowCondition: WorkflowConditionEvents = {
      [EventType.accounts]: [],
      [EventType.cardPayout]: [],
      [EventType.issuing]: [],
      [EventType.marketplace]: [],
      [EventType.gateway]: [],
      [EventType.dispute]: [],
      [EventType.fincrime]: [],
    };
    events.forEach((event) => {
      const [eventType, eventValue] = event.split(".");
      if (!(<any>Object).values(EventType).includes(eventType)) {
        throw new Error(`Unexpected checkout.com event type: ${event}`);
      }
      workflowCondition[eventType].push(eventValue);
    });
    Object.keys(workflowCondition).forEach((key) => {
      if (workflowCondition[key].length <= 0) {
        delete workflowCondition[key];
      }
    });
    return workflowCondition;
  }

  private workflowConditionsToEvents(
    conditions: WorkflowConditionEvents,
  ): Events {
    const result: string[] = [];

    // eslint-disable-next-line guard-for-in
    for (const key in conditions) {
      const conditionEvents = conditions[key];
      conditionEvents.forEach((conditionEvent) => result.push(`${key}.${conditionEvent}`));
    }
    return result;
  }

  private parseWorkflowConditions(webhookData: AnyObject): AnyObject {
    const eventCondition = webhookData.conditions.find(
      (condition) => condition.type === "event",
    );
    // eslint-disable-next-line no-param-reassign
    webhookData.events = this.workflowConditionsToEvents(
      eventCondition.events,
    );
    return webhookData;
  }

  private static getWebhookEventsCondition(
    webhook: AnyObject,
  ): WorkflowCondition {
    return (webhook.conditions as WorkflowCondition[]).find(
      (condition) => condition.type === "event",
    );
  }
}
