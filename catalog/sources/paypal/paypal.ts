import paypal from "paypal-rest-sdk";

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
  TestConnection,
} from "../../../types/sourceClassDefinition";

export default class PaypalIntegration implements IntegrationClassI {
  // just a random string
  id = "intg_182b1e2fc12";
  name = "Paypal";
  constructor({
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    environment
  }: {
    PAYPAL_CLIENT_ID: string;
    PAYPAL_CLIENT_SECRET: string;
    environment: string;
  }) {
    const mode = environment === "live" ? "live" : "sandbox";

    paypal.configure({
      mode, //sandbox or live
      client_id: PAYPAL_CLIENT_ID,
      client_secret: PAYPAL_CLIENT_SECRET,
    });
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    return new Promise((resolve, reject) => {
      paypal.notification.webhook.create(
        {
          url: webhookUrl,
          event_types: events.map((event) => ({ name: event })),
        },
        function (error, webhook) {
          if (error) {
            reject(error.response.message);
          } else {
            resolve({
              webhookData: webhook,
              events: webhook.event_types.map((event) => event.name),
            });
          }
        },
      );
    });
  }

  async verifyWebhookSignature({ request }: VerifyWebhookSignatureProps): Promise<Truthy> {
    const webhookIds: string[] = (await this.getWebhooks()).map((webhook) => webhook.id);

    const verifyHelper = (webhookId: string) => {
      return new Promise((resolve, reject) => {
        paypal.notification.webhookEvent.verify(
          request.headers,
          // seems like a faulty type in the @types package as this sample (https://github.com/paypal/PayPal-node-SDK/blob/master/samples/notifications/webhook-events/webhook_payload_verify.js)
          // suggests body should be a string
          request.body as any,
          webhookId,
          function (error, response) {
            if (error) {
              console.log(error);
              throw error;
            } else {
              console.log(response);

              // Verification status must be SUCCESS
              if (response.verification_status === "SUCCESS") {
                console.log("It was a success.");
                resolve(true);
              } else {
                console.log("It was a failed verification");
                reject("Unable to verify signature.");
              }
            }
          },
        );
      });
    };
    // try to verify the signature with each webhook id as we have no way to know which webhook to attribute the event to
    return (
      await Promise.all(webhookIds.map((webhookId) => verifyHelper(webhookId).catch(() => false)))
    ).some(Boolean);
  }

  async subscribe({ webhookId, events: newEvents }: SubscriptionProps): Promise<SubscribeReturns> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });
    // combine and uniq events
    const eventsAfterSubscribe = [...new Set([...subscribedEvents, ...newEvents])];
    return setWebhookEvents({ webhookId, events: eventsAfterSubscribe });
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterUnsubscribe = subscribedEvents.filter(
      (event: string) => !events.includes(event),
    );

    // If there are no events left, delete the webhook
    if (eventsAfterUnsubscribe.length === 0) {
      console.log("No more subed events, deleting webhook...");
      await this.deleteWebhookEndpoint({ webhookId });

      return {
        events: [],
      };
    }

    return setWebhookEvents({ webhookId, events: eventsAfterUnsubscribe });
  }

  async getWebhooks(): Promise<AnyObject | AnyObject[]> {
    return new Promise((resolve, reject) => {
      paypal.notification.webhook.list((error, data) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(data.webhooks);
        }
      });
    });
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    return new Promise((resolve, reject) => {
      paypal.notification.webhook.get(webhookId, function (error, webhook) {
        if (error) {
          reject(error.message);
        } else {
          resolve(webhook.event_types.map((event) => event.name));
        }
      });
    });
  }

  async deleteWebhookEndpoint({ webhookId }: WebhooksProps): Promise<Truthy> {
    return new Promise((resolve, reject) => {
      paypal.notification.webhook.del(webhookId, (error, response) => {
        if (error) reject(error.message);
        else resolve(response);
      });
    });
  }

  async testConnection(): Promise<TestConnection> {
    // try to list webhooks, generally a no error means the connection is good
    try {
      await this.getWebhooks();
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (error) {
      throw new Error(`Could not connect to PayPal: ${error}`);
    }
  }
}

async function setWebhookEvents({
  webhookId,
  events,
}: SubscriptionProps): Promise<SubscribeReturns> {
  return new Promise((resolve, reject) => {
    paypal.notification.webhook.replace(
      webhookId,
      [
        {
          op: "replace",
          path: "/event_types",
          value: events.map((event) => ({ name: event })),
        },
      ],
      (err, updatedWebhook) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({
            webhook: updatedWebhook,
            events: updatedWebhook.event_types.map((event) => event.name),
          });
        }
      },
    );
  });
}
