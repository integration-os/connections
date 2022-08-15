require("dotenv").config();

import JiraIntegration from "../catalog/jira/Jira";

const jiraIntegr = new JiraIntegration({
  JIRA_PROJECT_ID: process.env.JIRA_PROJECT_ID as string,
  JIRA_HOST: process.env.JIRA_HOST as string,
  JIRA_OAUTH2_ACCESS_TOKEN: process.env.JIRA_OAUTH2_ACCESS_TOKEN as string,
});

describe("Jira Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await jiraIntegr.deleteWebhookEndpoint({ webhookId });
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["jira:issue_created"];

      const { webhookData, events } = await jiraIntegr.init({
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
      const result = await jiraIntegr.verifyWebhookSignature({
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
})

function mockTestConnectionIntegration(): Partial<JiraIntegration> {
  return new (class extends JiraIntegration {
    readonly jiraClient;

    constructor() {
      super({
        JIRA_PROJECT_ID: "random-project-123",
        JIRA_HOST: "random-host-123",
        JIRA_OAUTH2_ACCESS_TOKEN: "random-oauth2-token",
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
