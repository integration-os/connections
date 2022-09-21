require("dotenv").config();

import JiraIntegration from "../catalog/jira/Jira";

const jira = new JiraIntegration({
  JIRA_PROJECT_ID: process.env.JIRA_PROJECT_ID as string,
  JIRA_HOST: process.env.JIRA_HOST as string,
  JIRA_OAUTH2_ACCESS_TOKEN: process.env.JIRA_OAUTH2_ACCESS_TOKEN as string,
});

describe("Jira Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await jira.deleteWebhookEndpoint({ webhookId });
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created"];

      const { webhookData, events } = await jira.init({
        webhookUrl: testWebhookUrl,
        events: testEvents,
      });

      expect(webhookData).toBeDefined();
      expect((webhookData as any).createdWebhookId).toBeDefined();
      expect(events).toEqual(testEvents);

      webhookId = (webhookData as any).createdWebhookId;
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true because it'll never verify it", async () => {
      const result = await jira.verifyWebhookSignature({
        signature: "any_signature",
        secret: "any_secret",
        request: {
          body: "any_body",
          headers: {key1: 123}
        }
      });

      expect(result).toBeTruthy();
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
        webhookId = undefined;
      }
    });

    it("should subscribe to the event", async () => {
      const result = await jira.subscribe({
        webhookId,
        events: ["jira:issue_updated"],
      });

      expect(result.events.length).toEqual(2);
      expect(result.events.find(x => x == "jira:issue_created")).toBeDefined();
      expect(result.events.find(x => x == "jira:issue_updated")).toBeDefined();
    });

    it("should handle subscription of an existing event", async () => {
      const result = await jira.subscribe({
        webhookId,
        events: ["jira:issue_created"],
      });

      expect(result.events).toEqual(["jira:issue_created"]);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created", "jira:issue_updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
        webhookId = undefined;
      }
    });

    it("should unsubscribe from the event(s)", async () => {
      const result = await jira.unsubscribe({
        webhookId,
        events: ["jira:issue_created"],
      });

      expect(result.events).toEqual(["jira:issue_updated"]);
    });

    it("should delete webhook if no events remain", async () => {
      const result = await jira.unsubscribe({
        webhookId,
        events: ["jira:issue_created", "jira:issue_updated"],
      });

      expect(result.events).toEqual([]);

      const noWebhook = await jira.getWebhooks({ webhookId });
      expect(noWebhook === undefined).toBe(true);
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created", "jira:issue_updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should return the webhook", async () => {
      const result = await jira.getWebhooks({
        webhookId
      });

      expect(result).toBeDefined();
      const whId = (result as any).id.toString();
      expect(whId).toEqual(webhookId);
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created", "jira:issue_updated"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      await deleteTestWebhook(webhookId);
      webhookId = undefined;
    });

    it("should return the subscribed events", async () => {
      const events = await jira.getSubscribedEvents({
        webhookId,
      });

      expect(events).toBeDefined();
      expect(events.length).toBe(2);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/rest/webhooks/webhook1";
      const testEvents = ["jira:issue_created"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should delete the webhook", async () => {
      const result = await jira.deleteWebhookEndpoint({
        webhookId: webhookId,
      });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should not throw an error even if a webhook does not exist", async () => {
      let errorMessage = "all well";

      try {
        await jira.deleteWebhookEndpoint({
          webhookId: "-666",
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch("all well");
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is successful", async () => {
      const result = await jira.testConnection();
      expect((result as any).success).toBe(true);
    });

    it("should throw an error if connection fails", async () => {
      let invalidValue = "?__?";

      let invalidJira = new JiraIntegration({
        JIRA_PROJECT_ID: invalidValue,
        JIRA_HOST: invalidValue,
        JIRA_OAUTH2_ACCESS_TOKEN: invalidValue,
      });

      let errorMessage = "all well";
      try {
        await invalidJira.testConnection();
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(
        /(Unable to establish a connection to Jira)/g
      );
    });
  });
})


//
// helper functions
//

function mockTestConnectionIntegration(): Partial<JiraIntegration> {
  return new (class extends JiraIntegration {
    readonly jiraClient;

    constructor() {
      super({
        JIRA_PROJECT_ID: "random-project-123",
        JIRA_HOST: "random-host-123",
        JIRA_OAUTH2_ACCESS_TOKEN: "random-oauth2-access-token",
      });

      const rejectedPromiseData = {
        code: 500,
        message: "Internal Server Error",
      };

      this.jiraClient = {
        webhooks: {
          registerDynamicWebhooks: jest.fn(() => {
            return Promise.reject(rejectedPromiseData);
          }),

          getDynamicWebhooksForApp: jest.fn(() => {
            return Promise.reject(rejectedPromiseData);
          }),

          deleteWebhookById: jest.fn(() => {
            return Promise.reject(rejectedPromiseData);
          }),
        },

        projects: {
          getAllProjects: jest.fn(() => {
            return Promise.reject(rejectedPromiseData);
          }),
        },
      };
    }
  })();
}

async function createTestWebhook(webhookUrl: string, events: string[]): Promise<string> {
    const req = {
      jqlFilter: `project = ${process.env.JIRA_PROJECT_ID}` ,
      events: events
    };

    const webhookResp = await jira.v3Client.webhooks.registerDynamicWebhooks({
      webhooks: [req],
      url: webhookUrl,
    });

    const webhook = webhookResp.webhookRegistrationResult[0];
    return webhook.createdWebhookId.toString();
}

async function deleteTestWebhook(webhookId: string | undefined) {
  if (webhookId) {
    await jira.deleteWebhookEndpoint({
      webhookId,
    });
  }
}
