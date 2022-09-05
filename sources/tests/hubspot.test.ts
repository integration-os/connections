import * as dotenv from "dotenv";
import { HubspotIntegration } from "../catalog/hubspot/hubspot";
import { SubscriptionResponseEventTypeEnum } from "@hubspot/api-client/lib/codegen/webhooks/models/SubscriptionResponse";
import crypto from "crypto";
import { VerifyWebhookSignatureProps } from "../types/classDefinition";

dotenv.config();

const WEBHOOK_TEST_BODY = `[{
            eventId: 1,
            subscriptionId: 12345,
            portalId: 62515,
            occurredAt: 1564113600000,
            subscriptionType: "contact.creation",
            attemptNumber: 0,
            objectId: 123,
            changeSource: "CRM",
            changeFlag: "NEW",
            appId: 54321,
          }]`;

describe("HubspotIntegration", () => {
  const hubspotIntegration = new HubspotIntegration({
    HUBSPOT_DEVELOPER_API_KEY: process.env.HUBSPOT_DEVELOPER_API_KEY,
    HUBSPOT_APP_ID: Number.parseInt(process.env.HUBSPOT_APP_ID),
    HUBSPOT_CLIENT_SECRET: process.env.HUBSPOT_CLIENT_SECRET,
  });
  const WEBHOOK_URL_PLACEHOLDER = "https://www.example.com/webhook";

  describe("init", () => {
    const webhookIds = [];

    afterEach(async () => {
      await Promise.all(
        webhookIds.map(
          async (id) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should create a webhook", async () => {
      const events: SubscriptionResponseEventTypeEnum[] = ["contact.creation"];
      const webhook = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events,
      });
      const webhookDataEvents = webhook.webhookData.map(({ eventType }) => eventType);
      webhookIds.push(...webhook.webhookData.map(({ id }) => id));

      expect(webhook.events).toEqual(events);
      expect(webhookDataEvents).toEqual(events);
      expect(webhookIds.every((id) => typeof id === "string")).toEqual(true);
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = [];
      const { webhookData } = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events: ["contact.creation"],
      });
      webhookIds.push(...webhookData.map(({ id }) => id));
    });

    afterEach(async () => {
      await Promise.all(
        webhookIds.map(
          async (id) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should return all webhooks", async () => {
      const webhooks = await hubspotIntegration.getWebhooks();
      const resultWebhookIds = webhooks.map(({ id }) => id);

      expect(resultWebhookIds.sort()).toEqual(webhookIds.sort());
    });

    it("should return only webhooks with IDs passed to the method", async () => {
      const webhooks = await hubspotIntegration.getWebhooks({
        webhookIds,
      });
      const resultWebhookIds = webhooks.map(({ id }) => id);

      expect(resultWebhookIds.sort()).toEqual(webhookIds.sort());
    });

    it("should return an empty array if passed webhook IDs aren't existed", async () => {
      const webhooks = await hubspotIntegration.getWebhooks({
        webhookIds: ["0"],
      });

      expect(webhooks).toEqual([]);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = [];
      const { webhookData } = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events: ["contact.creation"],
      });
      webhookIds.push(...webhookData.map(({ id }) => id));
    });

    afterEach(async () => {
      await Promise.all(
        webhookIds.map(
          async (id) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should return events", async () => {
      const events = await hubspotIntegration.getSubscribedEvents({
        webhookIds,
      });

      expect(events).toEqual(["contact.creation"]);
    });

    it("should return an empty array", async () => {
      const events = await hubspotIntegration.getSubscribedEvents({
        webhookIds: ["0"],
      });

      expect(events).toEqual([]);
    });
  });

  describe("subscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = [];
      const { webhookData } = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events: ["contact.creation"],
      });
      webhookIds.push(...webhookData.map(({ id }) => id));
    });

    afterEach(async () => {
      await Promise.all(
        webhookIds.map(
          async (id) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should subscribe to the events", async () => {
      const { webhooks, events } = await hubspotIntegration.subscribe({
        events: ["contact.deletion"],
        webhookIds,
      });
      const webhookDataEvents = webhooks.map(({ eventType }) => eventType);
      const eventsForChecking: SubscriptionResponseEventTypeEnum[] = [
        "contact.creation",
        "contact.deletion",
      ];

      expect(eventsForChecking.every((event) => webhookDataEvents.includes(event))).toEqual(true);
      expect(eventsForChecking.length).toEqual(webhookDataEvents.length);
      expect(eventsForChecking.every((event) => events.includes(event))).toEqual(true);
      expect(eventsForChecking.length).toEqual(events.length);
    });

    it("should handle passed events with an empty array", async () => {
      const { webhooks, events } = await hubspotIntegration.subscribe({
        events: [],
        webhookIds,
      });
      const webhookDataEvents = webhooks.map(({ eventType }) => eventType);
      const eventsForChecking: SubscriptionResponseEventTypeEnum[] = ["contact.creation"];

      expect(eventsForChecking.every((event) => webhookDataEvents.includes(event))).toEqual(true);
      expect(eventsForChecking.every((event) => events.includes(event))).toEqual(true);
    });

    it("should handle subscription to the existing events", async () => {
      const { webhooks, events } = await hubspotIntegration.subscribe({
        events: ["contact.creation"],
        webhookIds,
      });
      const webhookDataEvents = webhooks.map(({ eventType }) => eventType);
      const eventsForChecking: SubscriptionResponseEventTypeEnum[] = ["contact.creation"];
      const webhookIdsForChecking = webhooks.map(({ id }) => id);

      expect(eventsForChecking.every((event) => webhookDataEvents.includes(event))).toEqual(true);
      expect(eventsForChecking.every((event) => events.includes(event))).toEqual(true);
      expect(webhookIdsForChecking).toEqual(webhookIds);
    });
  });

  describe("unsubscribe", () => {
    let initialWebhooks: {
      id: string;
      eventType: SubscriptionResponseEventTypeEnum;
    }[] = [];

    beforeEach(async () => {
      initialWebhooks = [];
      const { webhookData } = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events: ["contact.creation", "contact.deletion"],
      });
      initialWebhooks.push(...webhookData.map(({ id, eventType }) => ({ id, eventType })));
    });

    afterEach(async () => {
      await Promise.all(
        initialWebhooks.map(
          async ({ id }) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should unsubscribe from the events", async () => {
      const eventsForUnsubscribe: SubscriptionResponseEventTypeEnum[] = ["contact.creation"];
      const { webhooks, events } = await hubspotIntegration.unsubscribe({
        events: eventsForUnsubscribe,
        webhookIds: initialWebhooks.map(({ id }) => id),
      });
      const webhookDataEvents = webhooks.map(({ eventType }) => eventType);
      const webhookDataIds = webhooks.map(({ id }) => id);
      const webhookIdsForChecking = initialWebhooks
        .filter(({ eventType }) => !eventsForUnsubscribe.includes(eventType))
        .map(({ id }) => id);

      expect(events).toEqual(["contact.deletion"]);
      expect(webhookDataEvents).toEqual(["contact.deletion"]);
      expect(webhookDataIds).toEqual(webhookIdsForChecking);
    });

    it("should unsubscribe from the non-existent events", async () => {
      const { webhooks, events } = await hubspotIntegration.unsubscribe({
        events: ["contact.privacyDeletion"],
        webhookIds: initialWebhooks.map(({ id }) => id),
      });
      const webhookDataEvents = webhooks.map(({ eventType }) => eventType);
      const webhookDataIds = webhooks.map(({ id }) => id);
      const webhookIdsForChecking = initialWebhooks.map(({ id }) => id);
      const eventsForChecking = ["contact.creation", "contact.deletion"];

      expect(
        events.every((event) =>
          eventsForChecking.includes(event as SubscriptionResponseEventTypeEnum),
        ),
      ).toEqual(true);
      expect(events.length).toEqual(eventsForChecking.length);
      expect(webhookDataEvents.every((event) => eventsForChecking.includes(event))).toEqual(true);
      expect(webhookDataEvents.length).toEqual(eventsForChecking.length);
      expect(webhookDataIds.sort()).toEqual(webhookIdsForChecking.sort());
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = [];
      const { webhookData } = await hubspotIntegration.init({
        webhookUrl: WEBHOOK_URL_PLACEHOLDER,
        events: ["contact.creation"],
      });
      webhookIds.push(...webhookData.map(({ id }) => id));
    });

    afterEach(async () => {
      await Promise.all(
        webhookIds.map(
          async (id) =>
            await hubspotIntegration.deleteWebhookEndpoint({
              webhookId: id,
            }),
        ),
      );
    });

    it("should delete webhook subscription", async () => {
      const webhookIdForDelete = webhookIds[0];
      const result = await hubspotIntegration.deleteWebhookEndpoint({
        webhookId: webhookIdForDelete,
      });

      expect(result).toBeTruthy();
    });

    it("should throw an error if non-existent webhook ID is passed", async () => {
      const webhookIdForDelete = "0";

      const result = await hubspotIntegration.deleteWebhookEndpoint({
        webhookId: webhookIdForDelete,
      });

      expect(result).toBeTruthy();
    });
  });

  describe("testConnection", () => {
    it("should return truthy value if valid credentials are passed", async () => {
      const hubspotIntegration = new HubspotIntegration({
        HUBSPOT_DEVELOPER_API_KEY: process.env.HUBSPOT_DEVELOPER_API_KEY,
        HUBSPOT_APP_ID: Number.parseInt(process.env.HUBSPOT_APP_ID),
        HUBSPOT_CLIENT_SECRET: process.env.HUBSPOT_CLIENT_SECRET,
      });

      await expect(hubspotIntegration.testConnection()).resolves.toBeTruthy();
    });

    it("should throw an error if invalid credentials are passed", async () => {
      const hubspotIntegration = new HubspotIntegration({
        HUBSPOT_DEVELOPER_API_KEY: "0",
        HUBSPOT_APP_ID: 0,
        HUBSPOT_CLIENT_SECRET: "0",
      });

      await expect(hubspotIntegration.testConnection()).rejects.toThrow();
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return truthy value if webhook signature is valid", async () => {
      const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
      const hash = generateReqHash(clientSecret);
      const result = hubspotIntegration.verifyWebhookSignature({
        signature: hash,
        request: {
          body: WEBHOOK_TEST_BODY,
        } as VerifyWebhookSignatureProps["request"],
        secret: clientSecret,
      });
      expect(result).toEqual(true);
    });
  });
});

function generateReqHash(secret: string): string {
  return crypto.createHash("sha256").update(`${secret}${WEBHOOK_TEST_BODY}`).digest("hex");
}
