require("dotenv").config();

import axios, { AxiosInstance } from "axios";
import * as https from "https";

import WooCommerceIntegration from "../catalog/woocommerce/WooCommerce";
import { AnyObject } from "../types/classDefinition";
import { createHmac } from "crypto";

describe("WooCommerce Integration", () => {
  describe("init", () => {
    let webhookIds: string[] = [];

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should create a webhook", async () => {
      const initReturns = await noSSLWooCommerce.init({
        webhookUrl: "https://example.com/webhook",
        events: ["order.created"],
      });

      expect(initReturns).toBeDefined();
      expect(initReturns.webhookData).toBeDefined();
      expect(initReturns.events).toEqual(["order.created"]);

      webhookIds.push(initReturns.webhookData[0].id);
    });

    it("should create a webhook with multiple events", async () => {
      const initReturns = await noSSLWooCommerce.init({
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

    const testSignature = createHmac("sha256", secret)
      .update(JSON.stringify(body), "utf8")
      .digest("base64");

    it("should return true if the signature is valid", async () => {
      const result = noSSLWooCommerce.verifyWebhookSignature({
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
      let errorMessage = "no error thrown";

      try {
        await noSSLWooCommerce.verifyWebhookSignature({
          request: {
            body: JSON.stringify({ id: 13 }),
            headers: { "X-WC-Webhook-Signature": testSignature },
          },
          signature: testSignature,
          secret,
        });
      } catch (error) {
        errorMessage = error.message;
      }
      await expect(errorMessage).toMatch(/Invalid signature/g);
    });
  });

  describe("subscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should subscribe to the event", async () => {
      const response = await noSSLWooCommerce.subscribe({
        webhookIds: webhookIds,
        events: ["product.created"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(2);
      expect(response.events).toEqual(["order.created", "product.created"]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });

    it("should handle subscription of an existing event", async () => {
      const response = await noSSLWooCommerce.subscribe({
        webhookIds: webhookIds,
        events: ["product.created", "product.deleted"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(3);
      expect(response.events).toEqual(["order.created", "product.created", "product.deleted"]);

      for (const webhook of response.webhooks as AnyObject[]) {
        webhookIds.push(webhook.id);
      }
    });
  });

  describe("unsubscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks(["order.created", "order.updated"]);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should unsubscribe from the event(s)", async () => {
      const response = await noSSLWooCommerce.unsubscribe({
        webhookIds: webhookIds,
        events: ["order.created"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(1);
      expect(response.events).toEqual(["order.updated"]);

      webhookIds = webhookIds.filter(
        (wid) => !response.webhooks.filter((webhook) => webhook.id).includes(wid),
      );
    });

    it("should delete webhook if no events remain", async () => {
      const response = await noSSLWooCommerce.unsubscribe({
        webhookIds: webhookIds,
        events: ["order.created", "order.updated"],
      });

      expect(response).toBeTruthy();
      expect(response.webhooks).toBeDefined();
      expect(response.webhooks).toHaveLength(0);
      expect(response.events).toEqual([]);

      webhookIds = webhookIds.filter(
        (wid) => !response.webhooks.filter((webhook) => webhook.id).includes(wid),
      );
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should return the webhook", async () => {
      const webhooks = await noSSLWooCommerce.getWebhooks({
        webhookIds: webhookIds,
      });

      expect(webhooks).toBeDefined();
      expect(webhooks).toHaveLength(1);
      expect(webhooks[0].id).toBe(webhookIds[0]);
    });

    it("should raise an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await noSSLWooCommerce.getWebhooks({ webhookIds: ["0"] });
      } catch (error) {
        errorMessage = error.message;
      }

      await expect(errorMessage).toMatch(/Webhook with ID 0 not found/g);
    });

    it("should raise an error if the webhook returns a non-404 HTTP response", async () => {
      let errorMessage = "no error thrown";

      try {
        await mockClientWooCommerce.getWebhooks({ webhookIds: ["0"] });
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toMatch(/Request failed with status code 500/g);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks(["order.created", "order.updated", "order.deleted"]);
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should return the subscribed events", async () => {
      const events = await noSSLWooCommerce.getSubscribedEvents({ webhookIds: webhookIds });

      expect(events).toBeDefined();
      expect(events).toHaveLength(3);
      expect(events).toEqual(["order.created", "order.updated", "order.deleted"]);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await dropWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should delete the webhook", async () => {
      const response = await noSSLWooCommerce.deleteWebhookEndpoint({ webhookId: webhookIds[0] });

      expect(response).toBeTruthy();

      webhookIds = webhookIds.filter((webhookId) => webhookId !== webhookIds[0]) || [];
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await noSSLWooCommerce.deleteWebhookEndpoint({ webhookId: "0" });
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toMatch(/Webhook with ID 0 not found/g);
    });

    it("should throw an error if the request fails with a non-404 HTTP status code", async () => {
      let errorMessage = "no error thrown";

      try {
        await mockClientWooCommerce.deleteWebhookEndpoint({ webhookId: "0" });
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toMatch(/Request failed with status code 500/g);
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const response = await noSSLWooCommerce.testConnection();

      expect(response).toBeTruthy();
    });
  });
});

// helpers
const noSSLWooCommerce = new (class extends WooCommerceIntegration {
  public client: AxiosInstance;

  constructor({
    WOOCOMMERCE_WP_URL,
    WOOCOMMERCE_CUSTOMER_SECRET,
    WOOCOMMERCE_CUSTOMER_KEY,
  }: {
    WOOCOMMERCE_WP_URL: string;
    WOOCOMMERCE_CUSTOMER_KEY: string;
    WOOCOMMERCE_CUSTOMER_SECRET: string;
  }) {
    super({
      WOOCOMMERCE_WP_URL,
      WOOCOMMERCE_CUSTOMER_SECRET,
      WOOCOMMERCE_CUSTOMER_KEY,
    });

    this.client = axios.create({
      baseURL: WOOCOMMERCE_WP_URL,
      auth: {
        username: WOOCOMMERCE_CUSTOMER_KEY,
        password: WOOCOMMERCE_CUSTOMER_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }
})({
  WOOCOMMERCE_WP_URL: process.env.WOOCOMMERCE_WP_URL!,
  WOOCOMMERCE_CUSTOMER_KEY: process.env.WOOCOMMERCE_CUSTOMER_KEY!,
  WOOCOMMERCE_CUSTOMER_SECRET: process.env.WOOCOMMERCE_CUSTOMER_SECRET!,
});

const mockClientWooCommerce = new (class extends WooCommerceIntegration {
  public client;

  constructor({
    WOOCOMMERCE_WP_URL,
    WOOCOMMERCE_CUSTOMER_SECRET,
    WOOCOMMERCE_CUSTOMER_KEY,
  }: {
    WOOCOMMERCE_WP_URL: string;
    WOOCOMMERCE_CUSTOMER_KEY: string;
    WOOCOMMERCE_CUSTOMER_SECRET: string;
  }) {
    super({
      WOOCOMMERCE_WP_URL,
      WOOCOMMERCE_CUSTOMER_SECRET,
      WOOCOMMERCE_CUSTOMER_KEY,
    });

    this.client = {
      get: jest.fn(() => {
        return Promise.reject({
          response: {
            status: 500,
          },
          message: "Request failed with status code 500",
        });
      }),
      delete: jest.fn(() => {
        return Promise.reject({
          response: {
            status: 500,
          },
          message: "Request failed with status code 500",
        });
      }),
    };
  }
})({
  WOOCOMMERCE_WP_URL: process.env.WOOCOMMERCE_WP_URL!,
  WOOCOMMERCE_CUSTOMER_KEY: process.env.WOOCOMMERCE_CUSTOMER_KEY!,
  WOOCOMMERCE_CUSTOMER_SECRET: process.env.WOOCOMMERCE_CUSTOMER_SECRET!,
});

async function createWebhooks(events: string[] = ["order.created"]) {
  const webhookIds: string[] = [];

  for (const event of events) {
    const response = await noSSLWooCommerce.client.post(`/wp-json/wc/v3/webhooks`, {
      topic: event,
      delivery_url: "https://example.com/webhook",
      secret: "secret",
    });

    webhookIds.push(response.data.id);
  }

  return webhookIds;
}

async function dropWebhooks(webhookIds: string[]) {
  if (webhookIds && webhookIds.length !== 0) {
    for (const webhookId of webhookIds) {
      await noSSLWooCommerce.client
        .delete(`/wp-json/wc/v3/webhooks/${webhookId}?force=true`)
        .catch((error) => {
          if (error.response?.status !== 404) {
            throw error;
          }
        });
    }

    return [];
  }
}
