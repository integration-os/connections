require("dotenv").config();

import { createHmac } from "crypto";
import AlchemyIntegration from "../catalog/alchemy/Alchemy";

const alchemy = new AlchemyIntegration({
  ALCHEMY_API_TOKEN: process.env.ALCHEMY_API_TOKEN as string,
  ALCHEMY_APP_ID: process.env.ALCHEMY_APP_ID as string,
});

const MINED_TRANSACTION = "MINED_TRANSACTION";

// getWebhooks works
const alchemyMockPartialFail = mockFailingIntegration();
alchemyMockPartialFail.getWebhooks = async ({ webhookId }: { webhookId: string }) => {
  return {
    id: webhookId,
    events: [MINED_TRANSACTION],
  };
};

// Everything fails
const alchemyMockFail = mockFailingIntegration();

describe("Alchemy Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const { webhookData, events } = <{ webhookData: any; events: [] }>await alchemy.init({
        webhookUrl: "https://example.com/webhook",
        events: [],
      });

      expect(webhookData).toHaveProperty("id");
      expect(webhookData).toHaveProperty("app_id");
      expect(webhookData.app_id).toEqual(process.env.ALCHEMY_APP_ID as string);
      expect(webhookData).toHaveProperty("network");
      expect(webhookData).toHaveProperty("webhook_type");
      expect(webhookData.webhook_type).toEqual(MINED_TRANSACTION);
      expect(webhookData.webhook_url).toEqual("https://example.com/webhook");
      expect(events).toEqual([MINED_TRANSACTION]);

      webhookId = webhookData.id;
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockPartialFail?.init?.({
          webhookUrl: "https://example.com/webhook",
          events: [MINED_TRANSACTION],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not initialize Alchemy integration: Request failed with status code 400/g,
      );
    });
  });

  describe("verifyWebhookSignature", () => {
    const testPayload = {
      webhookId: "wh_octjglnywaupz6th",
      id: "whevt_ogrc5v64myey69ux",
      createdAt: "2021-12-07T03:52:45.899Z",
      type: "MINED_TRANSACTION",
      event: {
        appId: "j6tqmhfxlu9pa5r7",
        network: "MATIC_MUMBAI",
        transaction: {
          blockHash: "0x0a50cb2068418da0d7746155be39cff624aaf6fca58fa7f86f139999947433db",
          blockNumber: "0x154f434",
          from: "0x829e20741ee472f628b260a591f9f78fb1a555f8",
          gas: "0x5208",
          gasPrice: "0xdf8475800",
          hash: "0xc981aed4304084ddf2b82859c80dd31334fad3bcf2aa7ee15dfd646af0889b7d",
          input: "0x",
          nonce: "0x8",
          to: "0x4577d79fc84838aee64ba8be8d250981dd4f3876",
          transactionIndex: "0x1",
          value: "0x0",
          type: "0x0",
          v: "0x27125",
          r: "0xc07a6670796726674e213c4cf61763b59490b1b1c992b9323a1aad5e3c2cea88",
          s: "0x22ce350c260b3dbd1ebc06ca00b18c127efd6c1b31136a104de1a6ea4aa3c0d2",
        },
      },
    };

    const testSecret = "1234";

    const testSignature = `${createHmac("sha256", testSecret)
      .update(JSON.stringify(testPayload))
      .digest("hex")}`;

    it("should return true if the signature is valid", async () => {
      const result = await alchemy.verifyWebhookSignature({
        signature: testSignature,
        secret: testSecret,
        request: {
          body: JSON.stringify(testPayload),
          headers: {},
        },
      });

      expect(result).toBeTruthy();
    });

    it("should throw an error if the signature is invalid", async () => {
      const invalidSignature = `${createHmac("sha256", "invalid_secret")
        .update(JSON.stringify(testPayload))
        .digest("hex")}`;

      let errorMessage = "no error thrown";

      try {
        await alchemy.verifyWebhookSignature({
          signature: invalidSignature,
          secret: testSecret,
          request: {
            body: JSON.stringify(testPayload),
            headers: {},
          },
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toEqual("Invalid signature");
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should not subscribe to any new events", async () => {
      const { webhook, events } = <{ webhook: any; events: [] }>await alchemy.subscribe({
        webhookId,
        events: ["non-existent event"],
      });

      expect(webhook).toHaveProperty("id");
      expect(webhook.id).toEqual(webhookId);
      expect(webhook).toHaveProperty("app_id");
      expect(webhook.app_id).toEqual(process.env.ALCHEMY_APP_ID as string);
      expect(webhook).toHaveProperty("network");
      expect(webhook).toHaveProperty("webhook_type");
      expect(webhook.webhook_type).toEqual(MINED_TRANSACTION);
      expect(webhook.webhook_url).toEqual("https://example.com/webhook");
      expect(events).toEqual([MINED_TRANSACTION]);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.subscribe?.({
          webhookId,
          events: [MINED_TRANSACTION],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not subscribe to new Alchemy events: Could not get Alchemy webhooks: Request failed with status code 400/g,
      );
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should not delete the webhook if events does not include MINED_TRANSACTION", async () => {
      const { events } = <{ webhook: any; events: [] }>await alchemy.unsubscribe({
        webhookId,
        events: ["non-existent event"],
      });

      expect(events).toEqual([MINED_TRANSACTION]);
    });

    it("should delete the webhook if events includes MINED_TRANSACTION", async () => {
      const { events } = <{ webhook: any; events: [] }>await alchemy.unsubscribe({
        webhookId,
        events: [MINED_TRANSACTION],
      });

      expect(events).toEqual([]);

      const response = await alchemy.client.get("/team-webhooks");

      expect(response.data.data).toEqual([]);

      webhookId = undefined;
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockPartialFail?.unsubscribe?.({
          webhookId,
          events: [MINED_TRANSACTION],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not unsubscribe from Alchemy events: Could not delete Alchemy webhook: Request failed with status code 400/g,
      );
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds.push(await createWebhook());
      webhookIds.push(await createWebhook());
    });

    afterEach(async () => {
      webhookIds.forEach(async (id) => await deleteWebhook(id));
      webhookIds = [];
    });

    it("should get a single webhook if a webhookId is passed", async () => {
      const webhook = <any>await alchemy.getWebhooks({ webhookId: webhookIds[0] });

      expect(webhook).toHaveProperty("id");
      expect(webhook.id).toEqual(webhookIds[0]);
      expect(webhook).toHaveProperty("app_id");
      expect(webhook.app_id).toEqual(process.env.ALCHEMY_APP_ID as string);
      expect(webhook).toHaveProperty("network");
      expect(webhook).toHaveProperty("webhook_type");
      expect(webhook.webhook_type).toEqual(MINED_TRANSACTION);
      expect(webhook.webhook_url).toEqual("https://example.com/webhook");
    });

    it("should get all webhooks if no webhookId is passed", async () => {
      const webhooks = <any>await alchemy.getWebhooks({});

      expect(webhooks.map((x) => x.id).sort()).toEqual(webhookIds.sort());
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.getWebhooks?.({});
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not get Alchemy webhooks: Request failed with status code 400/g,
      );
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should always be MINED_TRANSACTION", async () => {
      const events = <string[]>await alchemy.getSubscribedEvents({ webhookId });

      expect(events).toEqual([MINED_TRANSACTION]);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.getSubscribedEvents?.({ webhookId });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not get Alchemy webhooks: Request failed with status code 400/g,
      );
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should delete a webhook", async () => {
      const result = await alchemy.deleteWebhookEndpoint({ webhookId });
      expect(result).toBeTruthy();
      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await alchemy.deleteWebhookEndpoint({ webhookId: "asdf" });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/Request failed with status code 404/g);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockPartialFail?.deleteWebhookEndpoint?.({ webhookId });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not delete Alchemy webhook: Request failed with status code 400/g,
      );
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is successful", async () => {
      const result = await alchemy.testConnection();
      expect(result).toBeTruthy();
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.testConnection?.();
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not connect to Alchemy/g);
    });
  });
});

async function createWebhook() {
  const response = await alchemy.client.post("/create-webhook", {
    webhook_type: MINED_TRANSACTION,
    app_id: alchemy.ALCHEMY_APP_ID,
    webhook_url: "https://example.com/webhook",
  });

  return response.data.data.id;
}

async function deleteWebhook(webhookId) {
  if (webhookId) {
    await alchemy.deleteWebhookEndpoint({ webhookId });
  }
}

// Mock Integrations
function mockFailingIntegration(): Partial<AlchemyIntegration> {
  return new (class extends AlchemyIntegration {
    public client;

    constructor() {
      super({
        ALCHEMY_API_TOKEN: "arbitrary_api_token",
        ALCHEMY_APP_ID: "arbitrary_app_id",
      });

      this.client = {
        get: jest.fn(() => {
          return Promise.resolve({
            status: 400,
            data: {
              message: "Request failed with status code 400",
            },
          });
        }),

        post: jest.fn(() => {
          return Promise.resolve({
            status: 400,
            data: {
              message: "Request failed with status code 400",
            },
          });
        }),

        put: jest.fn(() => {
          return Promise.resolve({
            status: 400,
            data: {
              message: "Request failed with status code 400",
            },
          });
        }),

        delete: jest.fn(() => {
          return Promise.resolve({
            status: 400,
            data: {
              message: "Request failed with status code 400",
            },
          });
        }),
      };
    }
  })();
}
