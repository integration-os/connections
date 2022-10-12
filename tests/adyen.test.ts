import { AnyObject } from "../types/classDefinition";

require("dotenv").config();

import AdyenIntegration from "../catalog/adyen/adyen";

const adyen = new AdyenIntegration({
  ADYEN_COMPANY_ID: process.env.ADYEN_COMPANY_ID as string,
  ADYEN_API_KEY: process.env.ADYEN_API_KEY as string,
  ADYEN_VERIFICATION_USERNAME: process.env.ADYEN_VERIFICATION_USERNAME as string,
  ADYEN_VERIFICATION_PASSWORD: process.env.ADYEN_VERIFICATION_PASSWORD as string,
});

async function dropWebhooks(webhookIds: string[] = []) {
  if (webhookIds.length === 0) {
    const webhooks: any[] = await adyen.client.get("").then((response) => response.data.data);
    webhookIds = webhooks?.length > 0 ? webhooks.map((webhook) => webhook.id) : [];
  }

  for (const webhookId of webhookIds) {
    await adyen.client.delete(`/${webhookId}`).catch((err) => {
      if (err.response?.status !== 422) {
        throw err;
      }
    });
  }
}

async function createWebhooks(events: string[] = ["standard"]) {
  const webhookIds: string[] = [];

  for (const event of events) {
    const response = await adyen.client.post("", {
      active: true,
      communicationFormat: "json",
      filterMerchantAccountType: "allAccounts",
      type: event,
      url: "https://example.com/webhook",
      username: process.env.ADYEN_VERIFICATION_USERNAME,
      password: process.env.ADYEN_VERIFICATION_PASSWORD,
    });

    webhookIds.push(response.data.id);
  }

  return webhookIds;
}

describe("Adyen Integration", () => {
  describe("init", () => {
    afterEach(async () => {
      await dropWebhooks();
    });

    it("should create a webhook", async () => {
      const response = await adyen.init({
        webhookUrl: "https://example.com/webhook",
        events: ["standard"],
      });

      expect(response.webhookData).toBeDefined();
      expect(response.events).toEqual(["standard"]);
    });

    it("should create a webhook with multiple events", async () => {
      const response = await adyen.init({
        webhookUrl: "https://example.com/webhook",
        events: ["standard", "account-settings-notification"],
      });

      expect(response.webhookData).toBeDefined();
      expect(response.webhookData).toHaveLength(2);
      expect(response.events.sort()).toEqual(["standard", "account-settings-notification"].sort());
    });

    it("should only return created webhooks", async () => {
      const response = await adyen.init({
        webhookUrl: "https://example.com/webhook",
        events: ["standard", "badevent"],
      });

      expect(response.webhookData).toHaveLength(1);
      expect(response.events).toEqual(["standard"]);
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true", async () => {
      const basic = Buffer.from(
        `${process.env.ADYEN_VERIFICATION_USERNAME}:${process.env.ADYEN_VERIFICATION_PASSWORD}`,
      ).toString("base64");

      const result = adyen.verifyWebhookSignature({
        request: {
          body: JSON.stringify({}),
          headers: {
            authorization: `Basic ${basic}`,
          },
        },
        signature: "",
        secret: "",
      });

      expect(result).toBeTruthy();
    });

    it("should obtain signature from argument if available", async () => {
      const basic = Buffer.from(
        `${process.env.ADYEN_VERIFICATION_USERNAME}:${process.env.ADYEN_VERIFICATION_PASSWORD}`,
      ).toString("base64");

      const result = adyen.verifyWebhookSignature({
        request: {
          body: JSON.stringify({}),
          headers: {},
        },
        signature: basic,
        secret: "",
      });

      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      const wrongBasic = Buffer.from(`wrong:wrong`).toString("base64");
      let errorMessage = "no error thrown";

      try {
        adyen.verifyWebhookSignature({
          request: {
            body: JSON.stringify({}),
            headers: {
              authorization: `Basic ${wrongBasic}`,
            },
          },
          signature: wrongBasic,
          secret: "",
        });
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toMatch(/Invalid signature/g);
    });
  });

  describe("subscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks();
      webhookIds = [];
    });

    it("should subscribe to the event", async () => {
      const response = await adyen.subscribe({
        webhookIds: webhookIds,
        events: ["account-settings-notification"],
      });

      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(2);
      expect(response.events.sort()).toEqual(["standard", "account-settings-notification"].sort());

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });

    it("should handle subscription of an existing event", async () => {
      const response = await adyen.subscribe({
        webhookIds: webhookIds,
        events: ["standard", "account-settings-notification"],
      });

      expect(response.webhooks).toHaveLength(2);
      expect(response.events.sort()).toEqual(["standard", "account-settings-notification"].sort());

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });

    it("should only subscribe to valid events", async () => {
      const response = await adyen.subscribe({
        webhookIds: webhookIds,
        events: ["wrongevent"],
      });

      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["standard"]);
    });
  });

  describe("unsubscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks(["standard", "account-settings-notification"]);
    });

    afterEach(async () => {
      await dropWebhooks();
      webhookIds = [];
    });

    it("should unsubscribe from events", async () => {
      const response = await adyen.unsubscribe({
        webhookIds: webhookIds,
        events: ["account-settings-notification"],
      });

      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["standard"]);

      webhookIds = webhookIds.filter(
        (wid) => !response.webhooks.filter((webhook) => webhook.id).includes(wid),
      );
    });

    it("should delete webhook if no events remain", async () => {
      const response = await adyen.unsubscribe({
        webhookIds: webhookIds,
        events: ["standard", "account-settings-notification"],
      });

      expect(response.webhooks).toHaveLength(0);
      expect(response.events).toEqual([]);

      webhookIds = [];
    });

    it("should only remove existing webhooks/events", async () => {
      const response = await adyen.unsubscribe({
        webhookIds: webhookIds,
        events: ["wrongevent.updated", "standard"],
      });

      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["account-settings-notification"]);
    });

    it("should neglect non-existing webhook ids", async () => {
      const response = await adyen.unsubscribe({
        webhookIds: ["0", ...webhookIds],
        events: ["account-settings-notification"],
      });

      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["standard"]);
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks();
      webhookIds = [];
    });

    it("should return the webhook", async () => {
      const webhooks = await adyen.getWebhooks({
        webhookIds: webhookIds,
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
      expect(webhooks[0].id).toBe(webhookIds[0]);
    });

    it("should only return existing webhooks", async () => {
      const response = await adyen.getWebhooks({ webhookIds: ["0", ...webhookIds] });

      expect(response).toHaveLength(1);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks([
        "standard",
        "account-settings-notification",
        "banktransfer-notification",
      ]);
    });

    afterEach(async () => {
      await dropWebhooks();
      webhookIds = [];
    });

    it("should return the subscribed events", async () => {
      const events = await adyen.getSubscribedEvents({ webhookIds: webhookIds });

      expect(events).toHaveLength(3);
      expect(events.sort()).toEqual(
        ["standard", "account-settings-notification", "banktransfer-notification"].sort(),
      );
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks();
      webhookIds = [];
    });

    it("should delete the webhook", async () => {
      const response = await adyen.deleteWebhookEndpoint({ webhookId: webhookIds[0] });

      expect(response).toBeTruthy();

      webhookIds = webhookIds.filter((webhookId) => webhookId !== webhookIds[0]) || [];
    });

    it("should raise an error if the webhook does not exist", async () => {
      await expect(adyen.deleteWebhookEndpoint({ webhookId: "0" })).rejects.toThrow(
        /Unable to delete webhook id 0/g,
      );
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const response = await adyen.testConnection();

      expect(response).toBeTruthy();
    });
  });
});
