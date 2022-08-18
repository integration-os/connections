require("dotenv").config();

import DatadogIntegration from "../catalog/datadog/Datadog";
import { WebhooksIntegration } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1";

type DatadogRegion = "us1" | "us3" | "us5" | "eu" | "us1-fed";

const datadog = new DatadogIntegration({
  DATADOG_API_KEY: process.env.DATADOG_API_KEY as string,
  DATADOG_APP_KEY: process.env.DATADOG_APP_KEY as string,
  DATADOG_REGION: process.env.DATADOG_REGION as DatadogRegion,
});

describe("Datadog Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const webhook = await datadog.init({
        webhookUrl: "https://example.com/webhook",
        events: [], // ignored
      });

      webhookId = (webhook.webhookData as WebhooksIntegration).name;

      expect(webhook.webhookData).toBeDefined();
      expect(webhook.events).toEqual(["any"]);
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true", async () => {
      const result = await datadog.verifyWebhookSignature();

      expect(result).toBeTruthy();
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

    it("should return a webhook if its id is found", async () => {
      const result = await datadog.subscribe({
        webhookId: webhookId,
        events: [], // ignored
      });

      expect(result.webhook).toBeDefined();
      expect(result.events).toEqual(["any"]);
    });

    it("should create a webhook if its id is not found", async () => {
      const result = await datadog.subscribe({
        webhookId: "buildable-non-existent",
        events: [], // ignored
      });

      // delete the webhook we created
      await datadog.datadogClient.deleteWebhooksIntegration({
        webhookName: result.webhook?.name,
      });

      expect(result.webhook).toBeDefined();
      expect(result.events).toEqual(["any"]);
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

    it("should delete the webhook if its id is found", async () => {
      const result = await datadog.unsubscribe({
        webhookId: webhookId,
        events: [], // ignored
      });

      webhookId = undefined;

      expect(result.webhook).toBeDefined();
      expect(result.events).toEqual([]);
    });

    it("should raise an error if webhookId is not found", async () => {
      await expect(
        datadog.unsubscribe({
          webhookId: "not-found",
          events: [], // ignored
        }),
      ).rejects.toThrow();
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      await deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should return the webhook", async () => {
      const result = (await datadog.getWebhooks({
        webhookId: webhookId,
      })) as WebhooksIntegration;

      expect(result).toBeDefined();
      expect(result.name).toBe(webhookId);
    });

    it("should raise an error if the webhook does not exist", async () => {
      await expect(
        datadog.getWebhooks({
          webhookId: "not-found",
        }),
      ).rejects.toThrow();
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

    it('should return array with "any" string', async () => {
      const result = await datadog.getSubscribedEvents({
        webhookId,
      });

      expect(result).toEqual(["any"]);
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

    it("should delete the webhook", async () => {
      const result = await datadog.deleteWebhookEndpoint({
        webhookId: webhookId as string,
      });

      webhookId = undefined;

      expect(result).toBeTruthy();
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await datadog.testConnection();

      expect(result).toBeTruthy();
    });

    it("should raise an error if the connection is invalid", async () => {
      const mockDatadog = mockTestConnectionIntegration();

      await expect(mockDatadog.testConnection!()).rejects.toThrow();
    });
  });

  describe("getRegionUrl", () => {
    it("should return the correct region url", async () => {
      let result = DatadogIntegration.getRegionUrl("us1");
      expect(result).toEqual("api.datadoghq.com");

      result = DatadogIntegration.getRegionUrl("us3");
      expect(result).toEqual("us3.datadoghq.com");

      result = DatadogIntegration.getRegionUrl("us5");
      expect(result).toEqual("us5.datadoghq.com");

      result = DatadogIntegration.getRegionUrl("eu");
      expect(result).toEqual("datadoghq.eu");

      result = DatadogIntegration.getRegionUrl("us1-fed");
      expect(result).toEqual("ddog-gov.com");
    });
  });
});

// helper functions
async function createWebhook(): Promise<string> {
  const webhook = await datadog.datadogClient.createWebhooksIntegration({
    body: {
      name: "test-webhook",
      url: "https://example.com/webhook",
    },
  });

  return webhook.name;
}

async function deleteWebhook(webhookId: string | undefined) {
  if (webhookId) {
    await datadog.deleteWebhookEndpoint({
      webhookId,
    });
  }
}

function mockTestConnectionIntegration(): Partial<DatadogIntegration> {
  return new (class extends DatadogIntegration {
    public datadogClient;

    constructor() {
      super({
        DATADOG_API_KEY: "7606dd7296f5916bb66aa79c697da808",
        DATADOG_APP_KEY: "405cbb6b78c6e9040d23b8b2981b070d0eef4a70",
        DATADOG_REGION: "us5",
      });

      this.datadogClient = {
        getWebhooksIntegration: jest.fn(() => {
          return Promise.reject({
            code: 500,
            message: "Internal Server Error",
          });
        }),
      };
    }
  })();
}
