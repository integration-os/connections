import CircleCIIntegration from "../integrations/circleci/CircleCI";
import { createHmac } from "crypto";

const circleci = new CircleCIIntegration({
  CIRCLECI_PROJECT_ID: "e17b5b48-3814-445f-a943-158425e7a7e8",
  CIRCLECI_PERSONAL_API_KEY: "c39ae2d434e855bd4dfe6392baca8544835ed060",
});

const mockCircleCi = mockFailingIntegration();

describe("CircleCI Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should create a webhook", async () => {
      const webhookData = await circleci.init({
        webhookUrl: "https://example.com/webhook",
        events: ["job-completed"],
      });

      expect(webhookData.webhookData).toHaveProperty("id");
      expect(webhookData.webhookData).toHaveProperty("name");
      expect(webhookData.webhookData).toHaveProperty("url");
      expect(webhookData.webhookData).toHaveProperty("events");
      expect(webhookData.webhookData).toHaveProperty("scope");
      expect(webhookData.webhookData).toHaveProperty("verify_tls");
      expect(webhookData.webhookData).toHaveProperty("signing_secret");
      expect(webhookData.events).toEqual(["job-completed"]);

      webhookId = (webhookData.webhookData as any).id;
    });

    it("should raise an error if CircleCI does not return 201 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockCircleCi.init({
          webhookUrl: "https://example.com/webhook",
          events: ["job-completed"],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(
        /Could not initialize CircleCI integration/g
      );
    });
  });

  describe("verifyWebhookSignature", () => {
    const testPayload = {
      id: "3888f21b-eaa7-38e3-8f3d-75a63bba8895",
      happened_at: "2021-09-01T22:49:34.317Z",
      webhook: {
        id: "cf8c4fdd-0587-4da1-b4ca-4846e9640af9",
        name: "Sample Webhook",
      },
      project: {
        id: "84996744-a854-4f5e-aea3-04e2851dc1d2",
        name: "webhook-service",
        slug: "github/circleci/webhook-service",
      },
      organization: {
        id: "f22b6566-597d-46d5-ba74-99ef5bb3d85c",
        name: "circleci",
      },
      workflow: {
        id: "fda08377-fe7e-46b1-8992-3a7aaecac9c3",
        name: "build-test-deploy",
        created_at: "2021-09-01T22:49:03.616Z",
        stopped_at: "2021-09-01T22:49:34.170Z",
        url: "https://app.circleci.com/pipelines/github/circleci/webhook-service/130/workflows/fda08377-fe7e-46b1-8992-3a7aaecac9c3",
        status: "success",
      },
    };

    const testSignature = `v1=${createHmac("sha256", circleci.CIRCLECI_API_KEY)
      .update(JSON.stringify(testPayload))
      .digest("hex")}`;

    it("should return true if the signature is valid", async () => {
      const result = await circleci.verifyWebhookSignature({
        signature: testSignature,
        secret: circleci.CIRCLECI_API_KEY,
        request: {
          body: JSON.stringify(testPayload),
          headers: {},
        },
      });

      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      const invalidSignature = `v1=${createHmac("sha256", "invalid_secret")
        .update(JSON.stringify(testPayload))
        .digest("hex")}`;

      let errorMessage = "no error thrown";

      try {
        await circleci.verifyWebhookSignature({
          signature: invalidSignature,
          secret: circleci.CIRCLECI_API_KEY,
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
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["job-completed"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should subscribe to the event", async () => {
      const result = await circleci.subscribe({
        webhookId,
        events: ["workflow-completed"],
      });

      expect(result.events).toEqual(["job-completed", "workflow-completed"]);
    });

    it("should handle subscription of an existing event", async () => {
      const result = await circleci.subscribe({
        webhookId,
        events: ["job-completed"],
      });

      expect(result.events).toEqual(["job-completed"]);
    });

    it("should raise an error if CircleCI does not return 200 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockCircleCi.subscribe({
          webhookId: webhookId,
          events: ["job-completed"],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not subscribe to new events/g);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["job-completed", "workflow-completed"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should unsubscribe from the event(s)", async () => {
      const result = await circleci.unsubscribe({
        webhookId,
        events: ["job-completed"],
      });

      expect(result.events).toEqual(["workflow-completed"]);
    });

    it("should delete webhook if no events remain", async () => {
      const result = await circleci.unsubscribe({
        webhookId,
        events: ["workflow-completed", "job-completed"],
      });

      expect(result.events).toEqual([]);

      let errorMessage = "no error";

      try {
        await circleci.client.get(`/${webhookId}`);
      } catch (e) {
        errorMessage = e.response.data.message;
        webhookId = undefined;
      }

      expect(errorMessage).toMatch(/The webhook does not exist/g);
    });

    it("should raise an error if CircleCI does not return 200 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockCircleCi.unsubscribe({
          webhookId: webhookId,
          events: ["job-completed"],
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not unsubscribe to new events/g);
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["job-completed"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should return the webhook", async () => {
      const result = await circleci.getWebhooks({
        webhookId,
      });

      expect(result).toBeDefined();
      expect((result as any).id).toEqual(webhookId);
    });

    it("should raise an error if webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await circleci.getWebhooks({
          webhookId: "d53610b0-9a71-4748-bc02-55375444a7a1", // random, does not exist
        });
      } catch (err) {
        errorMessage = err.response ? err.response.data.message : err.message;
      }

      expect(errorMessage).toMatch(/The webhook does not exist/g);
    });

    it("should raise an error if CircleCI does not return 200 HTTP Code", async () => {
      let errorMessage = "no error message";

      const mock = mockFailGetIntegration();
      try {
        await mock.getWebhooks({
          webhookId: webhookId,
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not get CircleCI webhooks/g);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["workflow-completed", "job-completed"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should return the subscribed events", async () => {
      const events = await circleci.getSubscribedEvents({
        webhookId,
      });

      expect(events).toBeDefined();
      expect(events.length).toEqual(2);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["job-completed"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await circleci.client.delete(`/${webhookId}`);
        webhookId = undefined;
      }
    });

    it("should delete the webhook", async () => {
      const result = await circleci.deleteWebhookEndpoint({
        webhookId,
      });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await circleci.deleteWebhookEndpoint({
          webhookId: "d53610b0-9a71-4748-bc02-55375444a7a1", // random, does not exist
        });
      } catch (err) {
        errorMessage = err.response.data.message;
      }

      expect(errorMessage).toMatch(/The webhook does not exist/g);
    });

    it("should raise an error if CircleCI does not return 200 HTTP Code", async () => {
      let errorMessage = "no error message";

      try {
        await mockCircleCi.deleteWebhookEndpoint({
          webhookId: webhookId,
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toMatch(/Could not delete CircleCI webhook/g);
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is successful", async () => {
      const result = await circleci.testConnection();

      expect(result).toBeTruthy();
    });

    it("should raise an error if connection to CircleCI fails", async () => {
      let errorMessage = "no error thrown";

      const mock = mockFailGetIntegration();

      try {
        await mock.testConnection();
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/Could not connect to CircleCI/g);
    });
  });
});

// helper functions
async function createTestWebhook(webhookUrl: string, events: string[]) {
  const response = await circleci.client.post("", {
    name: circleci.CIRCLECI_WEBHOOK_NAME,
    url: webhookUrl,
    events: events,
    scope: {
      id: circleci.CIRCLECI_PROJECT_ID,
      type: "project",
    },
    "verify-tls": true,
    "signing-secret": circleci.CIRCLECI_API_KEY,
  });

  return response.data.id.toString();
}

// mock integrations
function mockFailingIntegration(): Partial<CircleCIIntegration> {
  return new (class extends CircleCIIntegration {
    public client;

    constructor() {
      super({
        CIRCLECI_PROJECT_ID: "arbitrary-project-id",
        CIRCLECI_PERSONAL_API_KEY: "arbitrary-personal-api-key",
      });

      this.getWebhooks = async ({ webhookId }) => {
        return {
          id: webhookId,
          events: ["workflow-completed"],
        };
      };

      this.client = {
        get: jest.fn(() => {
          return Promise.resolve({
            status: 204,
            data: {
              message: "Request failed with status code 204",
            },
          });
        }),

        post: jest.fn(() => {
          return Promise.resolve({
            status: 204,
            data: {
              message: "Request failed with status code 204",
            },
          });
        }),

        put: jest.fn(() => {
          return Promise.resolve({
            status: 204,
            data: {
              message: "Request failed with status code 204",
            },
          });
        }),

        delete: jest.fn(() => {
          return Promise.resolve({
            status: 204,
            data: {
              message: "Request failed with status code 204",
            },
          });
        }),
      };
    }
  })();
}

function mockFailGetIntegration(): Partial<CircleCIIntegration> {
  return new (class extends CircleCIIntegration {
    public client;

    constructor() {
      super({
        CIRCLECI_PROJECT_ID: "arbitrary-project-id",
        CIRCLECI_PERSONAL_API_KEY: "arbitrary-personal-api-key",
      });

      this.client = {
        get: jest.fn(async () => {
          throw new Error("Request failed with status code");
        }),
      };
    }
  })();
}
