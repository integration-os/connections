import Square from "../catalog/square/Square";
import SquareIntegration from "../catalog/square/Square";

require("dotenv").config();

const square = new SquareIntegration({
  SQUARE_SECRET_KEY: process.env.SQUARE_SECRET_KEY,
});

describe("Square Integration", () => {
  describe("init", () => {
    it("should create a webhook", async () => {
      const testWebhookUrl = "https://connect.demodomain.com/api";
      const testEvents = ["payment.created", "payment.updated"];

      const { webhookData, events } = await square.init({
        webhookUrl: testWebhookUrl,
        events: testEvents,
      });

      expect(webhookData).toBeDefined();
      expect((webhookData as any).subscription.id).toBeDefined();
      expect((webhookData as any).subscription.notificationUrl).toBe(testWebhookUrl);
      expect(events).toEqual(testEvents);
    });
  });

  describe("verifyWebhookSignature", () => {
    const SQUARE_SIGNATURE_KEY = "SignatureReceivedWhenWebhookIsCreated";
    const SQUARE_SIGNATURE = "b7XWjja7BmM/Fd6vlApFWYjyThMbgc2VZAs3UFOqA7Y=";

    const testRequest = {
      headers: {
        "x-forwarded-proto": "https",
        "x-forwarded-host": "connect.demodomain.com",
        "x-matched-path": "/api",
        "x-square-hmacsha256-signature": SQUARE_SIGNATURE
      },
      body: ""
    }

    it("should return true if the signature is valid", async () => {
      expect(
        await square.verifyWebhookSignature({
          request: testRequest,
          secret: SQUARE_SIGNATURE_KEY,
          signature: SQUARE_SIGNATURE,
        })
      ).toBeTruthy();
    });

    it("Should return false if the signature is invalid", async () => {
      expect(
        await square.verifyWebhookSignature({
          request: testRequest,
          secret: SQUARE_SIGNATURE_KEY,
          signature: "InvalidSignature",
        })
      ).toBeFalsy();
    })

  })

  describe("getWebhooks", () => {
    it("should return the webhook", async () => {
      const webhook = await square.getWebhooks();

      expect(webhook).toBeDefined();
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://connect.demodomain.com/api";
      const testEvents = ["payment.created", "payment.updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the subscribed events", async () => {
      const events = await square.getSubscribedEvents({ webhookId });
      expect(events).toBeDefined();
      expect(events.length).toBe(2);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://connect.demodomain.com/api";
      const testEvents = ["payment.created", "payment.updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should delete the webhook", async () => {
      const result = await square.deleteWebhookEndpoint({ webhookId });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage;

      try {
        await square.deleteWebhookEndpoint({
          webhookId: "invalid_webhook_id",
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/(Webhook subscription with ID)/g);
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://connect.demodomain.com/api";
      const testEvents = ["payment.created", "payment.updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should subscribe to the event", async () => {
      const result = await square.subscribe({ webhookId, events: ["booking.created"] });

      expect(result.events.length).toBe(3);
      expect(result.events).toContain("booking.created");
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://connect.demodomain.com/api";
      const testEvents = ["payment.created", "payment.updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should unsubscribe to the event", async () => {
      const result = await square.unsubscribe({ webhookId, events: ["payment.created"] });

      expect(result.events.length).toBe(1);
      expect(result.events).not.toContain("payment.created");
    });

    it("should delete the webhook if no events remain", async () => {
      const result = await square.unsubscribe({
        webhookId,
        events: ["payment.created", "payment.updated"],
      });

      expect(result.events.length).toBe(0);

      let errorCode;
      try {
        await square.getSubscribedEvents({ webhookId });
      } catch (error) {
        errorCode = error.errors[0].code;
        webhookId = undefined;
      }
      expect(errorCode).toBe("NOT_FOUND");
    });
  });

  describe("testConnection", () => {
    it("should return true if th connection is valid", async () => {
      const result = await square.testConnection();
      expect((result as any).success).toBe(true);
    });

    it("should throw an error if the connection is invalid", async () => {
      let badSquareConnection = new Square({ SQUARE_SECRET_KEY: "wrong-key" });
      let errorMessage;

      try {
        await badSquareConnection.testConnection();
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toMatch(/(Unable to establish a connection with Square)/g);
    });
  });
});

// helper functions
async function createTestWebhook(webhookUrl: string, events: string[]): Promise<string> {
  const webhook = await square.square.webhookSubscriptionsApi.createWebhookSubscription({
    subscription: {
      eventTypes: events,
      notificationUrl: webhookUrl,
    },
  });

  return webhook.result.subscription.id;
}

async function deleteTestWebhook(webhookId: string) {
  await square.square.webhookSubscriptionsApi.deleteWebhookSubscription(webhookId);
}
