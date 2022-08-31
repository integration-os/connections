require("dotenv").config();

import ShipStationIntegration from "../catalog/shipstation/shipstation";
import { AnyObject } from "../types/classDefinition";

jest.setTimeout(30_000);

const shipStation = new ShipStationIntegration({
  SHIP_STATION_URL: process.env.SHIP_STATION_URL as string,
  SHIP_STATION_API_KEY: process.env.SHIP_STATION_API_KEY as string,
  SHIP_STATION_SECRET_KEY: process.env.SHIP_STATION_SECRET_KEY as string,
});

async function createTestWebhook(testWebhookUrl: string, events: string[]): Promise<string> {
  const webhooks = await shipStation.init({ webhookUrl: testWebhookUrl, events });
  return `${webhooks.webhookData[0].WebHookID}`;
}

async function deleteTestWebhook(webhookId: string) {
  await shipStation.deleteWebhookEndpoint({ webhookId });
}

async function deleteTestWebhooks(webhookIds: string[]) {
  const webhooksDeleteRequest = webhookIds.map((webhookId) =>
    shipStation.deleteWebhookEndpoint({ webhookId }),
  );
  await Promise.all(webhooksDeleteRequest);
}

describe("ShipStation Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should create a webhook", async () => {
      const { webhookData, events } = await shipStation.init({
        webhookUrl: "https://webhook.site/30bf4e85-64b8-48ec-a1d2-1bb357a8a017",
        events: ["ORDER_NOTIFY"],
      });

      expect(webhookData).toBeDefined();
      expect(webhookData).toHaveLength(1);
      expect(events).toEqual(["ORDER_NOTIFY"]);

      webhookId = `${(webhookData as AnyObject[]).pop()?.WebHookID}`;
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true if the signature is valid", async () => {
      expect(
        shipStation.verifyWebhookSignature({
          request: { headers: {}, body: "" },
          signature: "",
          secret: null,
        }),
      ).toBeTruthy();
    });
  });

  describe("subscribe", () => {
    let webhookIds = new Array<string>();

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["ORDER_NOTIFY"];

      const webhookId = await createTestWebhook(testWebhookUrl, testEvents);
      webhookIds.push(webhookId);
    });

    afterEach(async () => {
      if (webhookIds.length) {
        await deleteTestWebhooks(webhookIds);

        webhookIds = new Array<string>();
      }
    });

    it("should subscribe to the new event by creating a new webhook", async () => {
      const { webhooks, events } = await shipStation.subscribe({
        events: ["ITEM_SHIP_NOTIFY"],
        webhookIds: [webhookIds[0]],
        webhookUrl: "https://example.com/webhook",
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(2);
      expect(events).toEqual(["ORDER_NOTIFY", "ITEM_SHIP_NOTIFY"]);

      webhookIds = (webhooks as AnyObject[]).map((wb) => `${wb.WebHookID}`);
    });

    it("should handle subscription of an existing event", async () => {
      const { webhooks, events } = await shipStation.subscribe({
        events: ["ORDER_NOTIFY"],
        webhookIds: [webhookIds[0]],
        webhookUrl: "https://example.com/webhook",
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
      expect(events).toEqual(["ORDER_NOTIFY"]);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["ORDER_NOTIFY"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should unsubscribe from the event(s)", async () => {
      const { webhooks, events } = await shipStation.unsubscribe({
        events: ["ORDER_NOTIFY"],
        webhookIds: [webhookId as string],
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(0);
      expect(events).toBeDefined();
      expect(events).toHaveLength(0);
    });

    it("should delete all webhooks if no events remain", async () => {
      const newWebhook = await shipStation.subscribe({
        webhookIds: [webhookId as string],
        events: ["SHIP_NOTIFY"],
      });

      expect(newWebhook.webhooks).toBeDefined();
      expect(newWebhook.webhooks).toHaveLength(2);
      expect(newWebhook.events).toBeDefined();
      expect(newWebhook.events).toHaveLength(2);

      const { webhooks, events } = await shipStation.unsubscribe({
        events: ["ORDER_NOTIFY", "SHIP_NOTIFY"],
        webhookIds: [webhookId as string],
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(0);
      expect(events).toBeDefined();
      expect(events).toHaveLength(0);

      await deleteTestWebhook((newWebhook.webhooks as AnyObject[]).pop()?.WebHookID);
      webhookId = undefined;
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    const testWebhookUrl = "https://example.com/webhook";
    const testEvents = ["ORDER_NOTIFY"];

    beforeEach(async () => {
      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return webhooks", async () => {
      const webhooks = await shipStation.getWebhooks({
        webhookIds: [webhookId as string],
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
    });

    it("should return all webhooks if webhookIds not provided", async () => {
      const webhooks = await shipStation.getWebhooks({
        webhookIds: undefined,
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
    });

    it("should return an empty data if the webhook does not exist", async () => {
      const webhooks = await shipStation.getWebhooks({
        webhookIds: ["123456789"],
      });
      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(0);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["ORDER_NOTIFY"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the subscribed events", async () => {
      const events = await shipStation.getSubscribedEvents({
        webhookIds: [webhookId as string],
      });

      expect(events).toEqual(["ORDER_NOTIFY"]);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["ORDER_NOTIFY"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should delete the webhook", async () => {
      const result = await shipStation.deleteWebhookEndpoint({
        webhookId: webhookId as string,
      });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should not throw an error if the webhook does not exist", async () => {
      const result = await shipStation.deleteWebhookEndpoint({
        webhookId: "123456",
      });

      expect(result).toBeTruthy();
    });

    it("should not throw an error if the webhook id is not a number string value", async () => {
      await expect(
        shipStation.deleteWebhookEndpoint({
          webhookId: "fdsfasd",
        }),
      ).rejects.toThrow();
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await shipStation.testConnection();
      expect((result as any).success).toBe(true);
    });

    it("should throw an error if connection fails", async () => {
      const badWebflowIntegration = new ShipStationIntegration({
        SHIP_STATION_URL: "",
        SHIP_STATION_API_KEY: "",
        SHIP_STATION_SECRET_KEY: "",
      });
      await expect(badWebflowIntegration.testConnection()).rejects.toThrow();
    });
  });
});
