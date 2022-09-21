require("dotenv").config();

import ZendeskIntegration from "../sources/catalog/zendesk/zendesk";
import { AnyObject } from "../types/classDefinition";
import { createHmac } from "crypto";

const zendesk = new ZendeskIntegration({
  ZENDESK_ACCESS_TOKEN: process.env.ZENDESK_ACCESS_TOKEN as string,
  ZENDESK_SUBDOMAIN_NAME: process.env.ZENDESK_SUBDOMAIN_NAME as string,
});

const webhook_secret = "bfaaa09f9485f47559bab7e8fab444beef7a72e494b811d56f929ca8c7978750";

// mock failing integrations
function mockFailingIntegration(): Partial<ZendeskIntegration> {
  return new (class extends ZendeskIntegration {
    public client;

    constructor() {
      super({
        ZENDESK_ACCESS_TOKEN: "arbitrary-access-token",
        ZENDESK_SUBDOMAIN_NAME: "someSubdomain"
      });

      this.client = {
        get: jest.fn(() => {
          return Promise.resolve({
            status: 404,
            data: {
              errors: [
                  {
                    code: "WebhookNotFound",
                    detail: "Webhook 01EMRHACJ81KB01FZW30NE8SJ3 could not be found",
                    id: "6ef45d115c1cfe68-ORD",
                    title: "Webhook Not Found"
                  }
                ]
            },
          });
        }),

        post: jest.fn(() => {
          return Promise.resolve({
            status: 403,
            data: {
              errors: [
                  {
                    code: "WebhookLimitExceeded",
                    title: "Webhook Limit Exceeded",
                    detail: "Account limit on number of webhooks has been reached"
                  }
                ]
            },
          });
        }),

        delete: jest.fn(() => {
          return Promise.resolve({
            status: 404,
            data: {
              errors: [
                  {
                    code: "WebhookNotFound",
                    detail: "Webhook 01EMRHACJ81KB01FZW30NE8SJ3 could not be found",
                    id: "6ef45d115c1cfe68-ORD",
                    title: "Webhook Not Found"
                  }
                ]
            },
          });
        }),
      };
    }
  })();
}

async function createTestWebhook(): Promise<string> {
  const webhook = await zendesk.init({ 
    webhookUrl: "https://example.com/webhook", 
    events: []
  }) as AnyObject;
  
  return webhook.webhookData.id;
}

async function deleteTestWebhook(webhookId: string | undefined) {
  if (webhookId) {
    await zendesk.deleteWebhookEndpoint({ webhookId });
  };
}

const mockZendesk = mockFailingIntegration();


describe("Zendesk Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const response = await zendesk.init({
        webhookUrl: "https://example.com/webhook",
        events: [], // ignored
      });

      const webhook = response.webhookData as AnyObject;

      webhookId = webhook.id;

      expect(webhook).toBeDefined();
      expect(webhook).toHaveProperty("id");
      expect(webhook).toHaveProperty("name");
      expect(webhook).toHaveProperty("status");
      expect(webhook).toHaveProperty("created_at");
      expect(webhook).toHaveProperty("created_by");
      expect(webhook).toHaveProperty("http_method");
      expect(webhook.endpoint).toEqual("https://example.com/webhook");
      expect(webhook.subscriptions).toEqual(["conditional_ticket_events"]);
    });

    it("should raise an error if Zendesk does not return 201 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockZendesk?.init?.({
          webhookUrl: "https://example.com/webhook",
          events: [],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not initialize Zendesk integration/g
      );
    });
  });

  describe("verifyWebhookSignature", () => {
    const testPayload = {
      ticket: {
          id: 35436,
          priority: "high",
          status: "open",
          subject: "Help, my printer is on fire!",
          description: "The fire is very colorful.",
          tags: [
              "enterprise",
              "other_tag"
          ]
      }
  };
    const timestamp = 123123123;

    // Mock private function 
    const getSigningSecret = jest.spyOn(ZendeskIntegration.prototype as any, 'getSigningSecret');
    getSigningSecret.mockImplementation(() => Promise.resolve(webhook_secret));

    const testSignature = `${createHmac("sha256", webhook_secret)
      .update(timestamp+JSON.stringify(testPayload))
      .digest("base64")}`;

    it("should return true if the signature is valid", async () => {
      const result = await zendesk.verifyWebhookSignature({
        signature: testSignature,
        request: {
          body: JSON.stringify(testPayload),
          headers: {
            "x-zendesk-webhook-signature-timestamp": timestamp 
          },
        },
        secret: null
      });
      expect(getSigningSecret).toBeCalled();
      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      const invalidSignature = `${createHmac("sha256", "invalid_secret")
        .update(timestamp+JSON.stringify(testPayload))
        .digest("base64")}`;

      let errorMessage = "no error thrown";

      try {
        await zendesk.verifyWebhookSignature({
          signature: invalidSignature,
          secret: null,
          request: {
            body: JSON.stringify(testPayload),
            headers: {
              "x-zendesk-webhook-signature-timestamp": timestamp 
            },
          },
        });
      } catch (e) {
        errorMessage = e.message;
      }
      expect(getSigningSecret).toBeCalled();
      expect(errorMessage).toEqual("Invalid signature");
    });

  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createTestWebhook();
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should return a webhook if its id is found", async () => {
      const result = await zendesk.subscribe({
        webhookId: webhookId,
        events: [], // ignored
      });

      expect(result.webhook).toBeDefined();
      expect(result.events).toEqual(["conditional_ticket_events"]);
    });

    it("should raise an error if Zendesk does not return 200 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockZendesk?.subscribe?.({
          webhookId: "buildable-non-existent",
          events: [], // ignored
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not get Zendesk webhooks/g);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createTestWebhook();
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should delete the webhook if its id is found", async () => {
      const result = await zendesk.unsubscribe({
        webhookId: webhookId,
        events: [], // ignored
      });

      webhookId = undefined;

      expect(result.webhook).toBeDefined();
      expect(result.events).toEqual([]);
    });

    it("should raise an error if webhookId is not found", async () => {
      await expect(
        zendesk.unsubscribe({
          webhookId: "not-found",
          events: [], // ignored
        }),
      ).rejects.toThrow();
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createTestWebhook();
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should return the webhook", async () => {
      const result = await zendesk.getWebhooks({ webhookId: webhookId }) as AnyObject;

      expect(result).toBeDefined();
      expect(result.id).toBe(webhookId);
    });

    it("should raise an error if the webhook does not exist", async () => {
      await expect(
        zendesk.getWebhooks({
          webhookId: "not-found",
        }),
      ).rejects.toThrow();
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createTestWebhook();
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it('should return array with "conditional_ticket_events" string', async () => {
      const result = await zendesk.getSubscribedEvents({
        webhookId,
      });

      expect(result).toEqual(["conditional_ticket_events"]);
    });
  });

  describe("deleteTestWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createTestWebhook();
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should delete the webhook", async () => {
      const result = await zendesk.deleteWebhookEndpoint({
        webhookId: webhookId as string,
      });

      webhookId = undefined;

      expect(result).toBeTruthy();
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await zendesk.testConnection();

      expect(result).toBeTruthy();
    });

    it("should raise an error if the connection is invalid", async () => {
      await expect(mockZendesk.testConnection!()).rejects.toThrow();
    });
  });
});