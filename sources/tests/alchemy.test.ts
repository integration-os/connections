require("dotenv").config();

import { createHmac } from "crypto";
import AlchemyIntegration from "../catalog/alchemy/Alchemy";

const alchemy = new AlchemyIntegration({
  ALCHEMY_API_TOKEN: process.env.ALCHEMY_API_TOKEN as string,
  ALCHEMY_APP_ID: process.env.ALCHEMY_APP_ID as string,
  ALCHEMY_ADDRESSES: process.env.ALCHEMY_ADDRESSES as string,
  ALCHEMY_TOKEN_IDS: process.env.ALCHEMY_TOKEN_IDS as string,
  ALCHEMY_NETWORK: process.env.ALCHEMY_NETWORK as string,
});

const EVENTS = {
  MINED_TRANSACTION: "MINED_TRANSACTION",
  DROPPED_TRANSACTION: "DROPPED_TRANSACTION",
  ADDRESS_ACTIVITY: "ADDRESS_ACTIVITY",
  NFT_ACTIVITY: "NFT_ACTIVITY",
};

// getWebhooks works
const alchemyMockPartialFail = mockFailingIntegration();
alchemyMockPartialFail.getWebhooks = async ({ webhookIds }: { webhookIds: string[] }) => {
  return webhookIds.map((id) => ({
    id,
    webhook_type: EVENTS.MINED_TRANSACTION,
  }));
};

// Everything fails
const alchemyMockFail = mockFailingIntegration();

describe("Alchemy Integration", () => {
  describe("init", () => {
    let webhookIds: string[] = [];

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should create a webhook", async () => {
      const { webhookData, events } = <{ webhookData: any; events: [] }>await alchemy.init({
        webhookUrl: "https://example.com/webhook",
        events: Object.values(EVENTS),
      });

      expect(webhookData.length).toBe(4);

      webhookData.forEach((webhook, i) => {
        expect(webhook).toHaveProperty("id");
        expect(webhook).toHaveProperty("webhook_type");
        expect(webhook.webhook_type).toEqual(events[i]);
        expect(webhook.webhook_url).toEqual("https://example.com/webhook");
      });

      expect(events).toEqual(Object.values(EVENTS));

      webhookIds = webhookData.map((w) => w.id);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockPartialFail?.init?.({
          webhookUrl: "https://example.com/webhook",
          events: [EVENTS.MINED_TRANSACTION],
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
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks();
    });

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should subscribe to new events", async () => {
      const { webhooks, events } = <{ webhooks: any; events: [] }>await alchemy.subscribe({
        webhookIds,
        events: [EVENTS.MINED_TRANSACTION, EVENTS.DROPPED_TRANSACTION, EVENTS.ADDRESS_ACTIVITY],
        webhookUrl: "https://example.com/webhook",
      });

      expect(webhooks.length).toBe(4);

      expect(events).toEqual([
        EVENTS.MINED_TRANSACTION,
        EVENTS.MINED_TRANSACTION,
        EVENTS.DROPPED_TRANSACTION,
        EVENTS.ADDRESS_ACTIVITY,
      ]);

      webhookIds = webhooks.map((x) => x.id);
    });

    it("should do nothing if events is empty", async () => {
      const { webhooks, events } = <{ webhooks: any; events: [] }>await alchemy.subscribe({
        webhookIds,
        events: [],
        webhookUrl: "https://example.com/webhook",
      });

      expect(webhooks.length).toBe(1);

      expect(events).toEqual([EVENTS.MINED_TRANSACTION]);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.subscribe?.({
          webhookIds,
          events: [EVENTS.MINED_TRANSACTION],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not get Alchemy webhooks: Request failed with status code 400/g,
      );
    });
  });

  describe("unsubscribe", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks([
        EVENTS.MINED_TRANSACTION,
        EVENTS.DROPPED_TRANSACTION,
        EVENTS.DROPPED_TRANSACTION,
        EVENTS.ADDRESS_ACTIVITY,
      ]);
    });

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should delete webhooks if included in events", async () => {
      const { webhooks, events } = <{ webhooks: any; events: [] }>await alchemy.unsubscribe({
        webhookIds,
        events: [EVENTS.DROPPED_TRANSACTION],
      });

      expect(webhooks.length).toBe(2);
      expect(webhooks[0].webhook_type).toEqual(EVENTS.MINED_TRANSACTION);
      expect(events).toEqual([EVENTS.MINED_TRANSACTION, EVENTS.ADDRESS_ACTIVITY]);

      webhookIds = webhooks.map((x) => x.id);
    });

    it("shouldn't delete webhooks if no events", async () => {
      const { webhooks, events } = <{ webhooks: any; events: [] }>await alchemy.unsubscribe({
        webhookIds,
        events: [EVENTS.NFT_ACTIVITY],
      });

      expect(webhooks.length).toBe(4);
      expect(events).toEqual([
        EVENTS.MINED_TRANSACTION,
        EVENTS.DROPPED_TRANSACTION,
        EVENTS.DROPPED_TRANSACTION,
        EVENTS.ADDRESS_ACTIVITY,
      ]);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockPartialFail?.unsubscribe?.({
          webhookIds,
          events: [EVENTS.MINED_TRANSACTION],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not delete Alchemy webhook: Request failed with status code 400/g,
      );
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks([EVENTS.MINED_TRANSACTION, EVENTS.DROPPED_TRANSACTION]);
    });

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should get a single webhook if a webhookId is passed", async () => {
      const webhooks = <any>await alchemy.getWebhooks({ webhookIds: [webhookIds[0]] });

      expect(webhooks.length).toBe(1);
      const webhook = webhooks[0];
      expect(webhook).toHaveProperty("id");
      expect(webhook.id).toEqual(webhookIds[0]);
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
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks([EVENTS.MINED_TRANSACTION, EVENTS.DROPPED_TRANSACTION]);
    });

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should get subcribed events", async () => {
      const events = <string[]>await alchemy.getSubscribedEvents({ webhookIds });

      expect(events).toEqual([EVENTS.MINED_TRANSACTION, EVENTS.DROPPED_TRANSACTION]);
    });

    it("should throw an error if Alchemy does not return 200", async () => {
      let errorMessage = "no error message";

      try {
        await alchemyMockFail?.getSubscribedEvents?.({ webhookIds });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not get Alchemy webhooks: Request failed with status code 400/g,
      );
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds = await createWebhooks([EVENTS.MINED_TRANSACTION, EVENTS.DROPPED_TRANSACTION]);
    });

    afterEach(async () => {
      await deleteWebhooks(webhookIds);
      webhookIds = [];
    });

    it("should delete a single webhook if webhookId is passed", async () => {
      const result = await alchemy.deleteWebhookEndpoint({ webhookId: webhookIds[0] });
      expect(result).toBeTruthy();

      const webhooks = await alchemy.getWebhooks({});
      expect(webhooks.length).toBe(1);
      webhookIds = webhooks.map((x) => x.id);
    });

    it("should delete multiple webhooks if webhookIds is passed", async () => {
      const result = await alchemy.deleteWebhookEndpoint({ webhookIds });
      expect(result).toBeTruthy();

      const webhooks = await alchemy.getWebhooks({});
      expect(webhooks.length).toBe(0);
      webhookIds = [];
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
        await alchemyMockPartialFail?.deleteWebhookEndpoint?.({ webhookIds });
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

async function createWebhooks(events: string[] = [EVENTS.MINED_TRANSACTION]): Promise<string[]> {
  const { webhookData } = await alchemy.init({
    events,
    webhookUrl: "https://example.com/webhook",
  });

  return webhookData.map((x) => x.id);
}

async function deleteWebhooks(webhookIds) {
  if (webhookIds && webhookIds.length > 0) {
    await alchemy.deleteWebhookEndpoint({ webhookIds });
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
