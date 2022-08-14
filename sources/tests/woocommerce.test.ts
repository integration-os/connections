import { AnyObject } from "../types/classDefinition";

require("dotenv").config();

import WooCommerceIntegration from "../catalog/woocommerce/WooCommerce";
import crypto from "crypto";

const woocommerce = new WooCommerceIntegration({
  WOOCOMMERCE_WP_URL: process.env.WOOCOMMERCE_WP_URL,
  WOOCOMMERCE_CUSTOMER_SECRET: process.env.WOOCOMMERCE_CUSTOMER_SECRET,
  WOOCOMMERCE_CUSTOMER_KEY: process.env.WOOCOMMERCE_CUSTOMER_KEY,
});

async function createWebhooks(webhookIds: string[], events: string[] = ["order.created"]) {
  for (const event of events) {
    const response = await woocommerce.client.post(`/wp-json/wc/v3/webhooks`, {
      topic: event,
      delivery_url: "https://example.com/webhook",
      secret: "secret",
    });

    webhookIds.push(response.data.id);
  }
}

async function dropWebhooks(webhookIds: string[]) {
  if (webhookIds.length !== 0) {
    for (const webhookId of webhookIds) {
      await woocommerce.client.delete(`/wp-json/wc/v3/webhooks`);
    }
  }
}

describe("WooCommerce Integration", () => {
  describe("init", () => {
    let webhookIds: string[] = [];

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should create a webhook", async () => {
      const initReturns = await woocommerce.init({
        webhookUrl: "https://example.com/webhook",
        events: ["order.created"],
      });

      expect(initReturns).toBeDefined();
      expect(initReturns.webhookData).toBeDefined();
      expect(initReturns.events).toEqual(["order.created"]);

      webhookIds.push(initReturns.webhookData[0].id);
    });

    it("should create a webhook with multiple events", async () => {
      const initReturns = await woocommerce.init({
        webhookUrl: "https://example.com/webhook",
        events: ["order.created", "order.updated"],
      });

      expect(initReturns).toBeDefined();
      expect(initReturns.webhookData).toBeDefined();
      expect(initReturns.webhookData).toHaveLength(2);
      expect(initReturns.events).toEqual(["order.created", "order.updated"]);

      for (const webhook of initReturns.webhookData as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });
  });

  describe("verifyWebhookSignature", () => {
    const secret = "secret";
    const body = {
      id: "1",
      created_at: "2020-01-01T00:00:00",
      updated_at: "2020-01-01T00:00:00",
      status: "pending",
      currency: "USD",
      customer_id: "1",
      customer_note: "",
      billing: {
        first_name: "John",
        last_name: "Doe",
        company: "",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "",
      },
    };

    const testSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(body), "utf8")
      .digest("base64");

    it("should return true if the signature is valid", async () => {
      const result = woocommerce.verifyWebhookSignature({
        request: {
          body: JSON.stringify(body),
          headers: { "X-WC-Webhook-Signature": testSignature },
        },
        signature: testSignature,
        secret,
      });

      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      await expect(
        woocommerce.verifyWebhookSignature({
          request: {
            body: JSON.stringify({ id: 13 }),
            headers: { "X-WC-Webhook-Signature": testSignature },
          },
          signature: testSignature,
          secret,
        }),
      ).rejects.toThrow("/Invalid signature/g");
    });
  });

  describe("subscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      await createWebhooks(webhookIds);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should subscribe to the event", async () => {
      const response = await woocommerce.subscribe({
        webhookId: webhookIds[0],
        events: ["product.created"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(2);
      expect(response.events).toEqual(["order.created", "products.created"]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });

    it("should handle subscription of an existing event", async () => {
      const response = await woocommerce.subscribe({
        webhookId: webhookIds[0],
        events: ["product.created", "product.deleted"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(3);
      expect(response.events).toEqual(["order.created", "products.created", "products.deleted"]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });
  });

  describe("unsubscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      await createWebhooks(webhookIds, ["order.created", "order.updated"]);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should unsubscribe from the event(s)", async () => {
      const response = await woocommerce.unsubscribe({
        webhookId: webhookIds[0],
        events: ["order.created"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["order.updated"]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });

    it("should delete webhook if no events remain", async () => {
      const response = await woocommerce.unsubscribe({
        webhookId: webhookIds[0],
        events: ["order.created", "order.updated"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(0);
      expect(response.events).toEqual([]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      await createWebhooks(webhookIds);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should return the webhook", async () => {
      const webhooks = await woocommerce.getWebhooks({
        webhookId: webhookIds[0],
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
      expect(webhooks[0].id).toBe(webhookIds[0]);
    });

    it("should raise an error if the webhook does not exist", async () => {
      await expect(woocommerce.getWebhooks({ webhookIds: ["1"] })).rejects.toThrow();
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      await createWebhooks(webhookIds, ["order.created", "order.updated", "order.deleted"]);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should return the subscribed events", async () => {
      const events = await woocommerce.getSubscribedEvents({ webhookId: webhookIds[0] });

      expect(events).toBeDefined();
      expect(events).toHaveLength(3);
      expect(events).toEqual(["order.created", "order.updated", "order.deleted"]);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      await createWebhooks(webhookIds, ["order.created", "order.updated", "order.deleted"]);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
    });

    it("should delete the webhook", async () => {
      const response = await woocommerce.deleteWebhookEndpoint({ webhookId: webhookIds[0] });

      expect(response).toBeTruthy();

      webhookIds = webhookIds.filter((webhookId) => webhookId !== webhookIds[0]);
    });

    it("should throw an error if the webhook does not exist", async () => {
      await expect(woocommerce.deleteWebhookEndpoint({ webhookId: "1" })).rejects.toThrow();
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const response = await woocommerce.testConnection();

      expect(response).toBeTruthy();
    });
  });
});
