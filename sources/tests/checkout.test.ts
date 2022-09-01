require("dotenv").config();

import CheckoutIntegration from "../catalog/checkout/Checkout";
import { AnyObject } from "../types/classDefinition";
import { createHmac } from "crypto";

const checkout = new CheckoutIntegration({
  CHECKOUT_API_KEY_SECRET: process.env.CHECKOUT_API_KEY_SECRET,
});
const invalidClient = new CheckoutIntegration({
  CHECKOUT_API_KEY_SECRET: "invalid-api-key",
});
const webhookSignKey = process.env.CHECKOUT_API_KEY_SECRET;
const defaultEvents = ['gateway.payment_paid'];
const eventPayload = {
  id: "evt_hbnxegj3dqyu5fsd4p2b4bxvpa",
  type: "payment_paid",
  created_on: "2019-12-11T08:59:39Z",
  data: {
    action_id: "act_fgmhgzodurievpxbdzgl3ftxce",
    auth_code: "924041",
    response_code: "10000",
    response_summary: "Approved",
    amount: 115,
    metadata: {
      coupon_code: "NY2018",
      partner_id: 123989,
    },
    destination: {
      id: "src_cdfv47bowvmezfdhjt7ibqrdxy",
      type: "card",
      expiry_month: 12,
      expiry_year: 2020,
      name: "John Smith",
      scheme: "Visa",
      last_4: "4242",
      fingerprint: "436d1eb12c4b92b9eeb1e798dea93a718c78f5362c7fb5d84b51c72a869b6101",
      bin: "424242",
      card_type: "Credit",
      card_category: "Consumer",
      issuer: "JPMORGAN CHASE BANK NA",
      issuer_country: "US",
      product_id: "A",
      product_type: "Visa Traditional",
      avs_check: "S",
      cvv_check: "Y",
    },
    customer: {
      id: "cus_bv2khjtcah5uzimoi2qvniwnsm",
    },
    id: "pay_fk234x52k6i4rmjmqnzx474fqi",
    currency: "DKK",
    processed_on: "2019-12-11T08:59:40Z",
  },
  _links: {
    self: {
      href: "https://api.checkout.com/events/evt_hbnxegj3dqyu5fsd4p2b4bxvpa",
    },
    subject: {
      href: "https://api.checkout.com/workflows/events/subject/pay_jlfj2ful7z3u5lbykhy5lzezvm",
    },
  },
};
const payloadSignature = createHmac("sha256", webhookSignKey)
  .update(JSON.stringify(eventPayload))
  .digest("hex");

describe("Checkout Integration", () => {
  // Delete any hanging webhooks
  beforeAll(async () => {
    const webhooks = await getAllWebhooks();
    if (webhooks.length > 0) {
      await Promise.all(
        webhooks.map(webhook => checkout.deleteWebhookEndpoint({ webhookId: webhook.id }))
      );
    }
  });

  describe("init", () => {
    it("should create a webhook", async () => {
      const events = ["gateway.payment_paid"];
      const webhook = await checkout.init({
        webhookUrl: "https://example.com/webhook",
        events,
      });
      expect(webhook.webhookData).toBeDefined();
      expect(webhook.events).toEqual(events);
    });

    it("should throw an error if webhook creation fails", async () => {
      try {
        const events = ["gateway.payment_paid"];
        await invalidClient.init({
          webhookUrl: "https://example.com/webhook",
          events,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Something went wrong while initializing webhook');
      }
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true when signature is valid", () => {
      const result = checkout.verifyWebhookSignature({
        request: {
          headers: {},
          body: JSON.stringify(eventPayload),
        },
        signature: payloadSignature,
        secret: webhookSignKey,
      });

      expect(result).toBeTruthy();
    });

    it("should throw an error when signature is valid", () => {
      const invalidSignature = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
      try {
        checkout.verifyWebhookSignature({
          request: {
            headers: {},
            body: JSON.stringify(eventPayload),
          },
          signature: invalidSignature,
          secret: webhookSignKey,
        });
      } catch(error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Invalid Signature');
      }
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      if (!webhookId){
        webhookId = await createWebhook();
      }
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteWebhook(webhookId);
        webhookId = undefined;
      }
    });

    it("should return the webhook data corresponding to the webhook id when a single webhook is requested", async () => {
      const webhook = await checkout.getWebhooks({webhookId});
      expect(webhook).toBeDefined();
      expect(webhook.id).toBe(webhookId)
    });

    it("should thrown an error if the request fails", async () => {
      try {
        await invalidClient.getWebhooks({ webhookId });
      } catch(error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Error retrieving webhooks');
      }
    })
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;
    beforeAll(async () => {
      webhookId = await createWebhook();
    });
    afterAll(async () => {
      await deleteWebhook(webhookId);
    });

    it("should update a webhook with new events", async () => {
      const newEvents = ['gateway.payment_approved', 'gateway.payment_declined', 'dispute.dispute_canceled'];
      await checkout.subscribe({webhookId: webhookId, events: newEvents});
      const webhook = await checkout.getWebhooks({ webhookId });
      expect(webhook.events).toEqual(expect.arrayContaining([...defaultEvents, ...newEvents]));
    });

    it("should throw an error if something goes wrong", async () => {
      try {
        const newEvents = ['gateway.payment_approved', 'gateway.payment_declined', 'dispute.dispute_canceled'];
        await invalidClient.subscribe({webhookId: webhookId, events: newEvents});
      } catch(error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Could not subscribe to new events');
      }
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;
    const webhookEvents = ['gateway.payment_approved', 'dispute.dispute_canceled'];
    beforeAll(async () => {
      webhookId = await createWebhook(webhookEvents);
    });
    afterAll(async () => {
      await deleteWebhook(webhookId);
    });

    it("should unsubscribe webhook from events", async () => {
      const unsubscribeEvents = ['dispute.dispute_canceled'];
      await checkout.unsubscribe({webhookId, events: unsubscribeEvents});
      const webhook = await checkout.getWebhooks({ webhookId });
      expect(webhook.events).toEqual(['gateway.payment_approved']);
    });

    it("should throw an error if something goes wrong", async () => {
      try {
        const unsubscribeEvents = [...defaultEvents, 'dispute.dispute_canceled'];
        await invalidClient.unsubscribe({webhookId, events: unsubscribeEvents});
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Could not unsubscribe from events');
      }
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;
    const webhookEvents = ['gateway.payment_approved', 'dispute.dispute_canceled'];
    beforeAll(async () => {
      webhookId = await createWebhook(webhookEvents);
    });
    afterAll(async () => {
      await deleteWebhook(webhookId);
    });

    it("should return the events to which the webhook is subscribing", async () => {
      const subscribedEvents = await checkout.getSubscribedEvents({ webhookId });
      expect(subscribedEvents).toEqual(expect.arrayContaining(webhookEvents));
    });

    it("should throw an error if something goes wrong", async () => {
      try {
        await invalidClient.getSubscribedEvents({ webhookId });
      } catch(error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Error getting subscribed events');
      }
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await checkout.testConnection();
      expect(result).toBeTruthy();
    });

    it("should throw an error if something goes wrong with the connection", async () => {
      try {
        await invalidClient.testConnection();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

// helper functions
async function createWebhook(events: string[] = defaultEvents): Promise<string> {
  const webhook = await checkout.init({
    webhookUrl: 'https://example.com',
    events,
  });
  return (webhook.webhookData as unknown as string);
}

async function deleteWebhook(webhookId: string) {
  await checkout.deleteWebhookEndpoint({
    webhookId,
  });
}

async function getAllWebhooks(): Promise<AnyObject[]> {
  const response = await checkout['checkout'].get('/');
  return response.data.data;
}
