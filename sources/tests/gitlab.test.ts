
import GitLabIntegration from "../catalog/gitlab/GitLab";

const gitlab = new GitLabIntegration({
  GITLAB_PROJECT_ID: process.env.GITLAB_PROJECT_ID as string,
  GITLAB_WEBHOOK_SECRET: process.env.GITLAB_WEBHOOK_SECRET as string,
  GITLAB_ACCESS_TOKEN: process.env.GITLAB_ACCESS_TOKEN as string,
});

async function createTestWebhook(testWebhookUrl: string): Promise<string> {
  const response = await gitlab.client.post(`/projects/${gitlab.GITLAB_PROJECT_ID}/hooks`, {
    url: testWebhookUrl,
    push_events: true,
    pipeline_events: true,
  });

  return response.data.id.toString();
}

async function deleteTestWebhook(webhookId: string) {
  await gitlab.client.delete(`/projects/${gitlab.GITLAB_PROJECT_ID}/hooks/${webhookId}`);
}

describe("GitLab Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should create a webhook", async () => {
      const testUrl = "http://www.example.com/webhook";
      const testEvents = ["push_events", "issues_events"];

      const { webhookData, events } = await gitlab.init({
        webhookUrl: testUrl,
        events: testEvents,
      });

      expect(webhookData).toBeDefined();
      expect((webhookData as any).url).toEqual(testUrl);
      expect(events).toEqual(testEvents);

      webhookId = (webhookData as any).id;
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should return true if the signature is valid", async () => {
      expect(
        await gitlab.verifyWebhookSignature({
          request: { body: "", headers: undefined },
          secret: "",
          signature: gitlab.GITLAB_WEBHOOK_SECRET,
        }),
      ).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      let errorMessage = "no error thrown";

      try {
        gitlab.verifyWebhookSignature({
          request: { body: "", headers: undefined },
          secret: "",
          signature: "",
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/(Invalid webhook signature)/g);
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";

      webhookId = await createTestWebhook(testWebhookUrl);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should subscribe to the event", async () => {
      const { webhook, events } = await gitlab.subscribe({
        events: ["releases_events"],
        webhookId: webhookId,
      });

      expect(webhook).toBeDefined();
      expect(events).toEqual(["push_events", "pipeline_events", "releases_events"]);
    });

    it("should handle subscription of an existing event", async () => {
      const { webhook, events } = await gitlab.subscribe({
        events: ["push_events"],
        webhookId: webhookId,
      });

      expect(webhook).toBeDefined();
      expect(events).toEqual(["push_events", "pipeline_events"]);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";

      webhookId = await createTestWebhook(testWebhookUrl);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should unsubscribe from the event(s)", async () => {
      const { webhook, events } = await gitlab.unsubscribe({
        events: ["push_events"],
        webhookId: webhookId,
      });

      expect(webhook).toBeDefined();
      expect(events).toEqual(["pipeline_events"]);
    });

    it("should delete webhook if no events remain", async () => {
      const { webhook, events } = await gitlab.unsubscribe({
        events: ["push_events", "pipeline_events"],
        webhookId: webhookId,
      });

      expect(webhook).toBeDefined();
      expect(events).toHaveLength(0);

      await expect(
        gitlab.client.delete(`/projects/${gitlab.GITLAB_PROJECT_ID}/hooks/${webhookId}`),
      ).rejects.toThrow();

      webhookId = undefined;
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";

      webhookId = await createTestWebhook(testWebhookUrl);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the webhook", async () => {
      const webhook = await gitlab.getWebhooks({
        webhookId,
      });

      expect(webhook).toBeDefined();
    });

    it("should raise an error if the webhook does not exist", async () => {
      await expect(
        gitlab.getWebhooks({
          webhookId: "123456789",
        }),
      ).rejects.toThrow();
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";

      webhookId = await createTestWebhook(testWebhookUrl);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the subscribed events", async () => {
      const events = await gitlab.getSubscribedEvents({
        webhookId,
      });

      expect(events).toEqual(["push_events", "pipeline_events"]);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";

      webhookId = await createTestWebhook(testWebhookUrl);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should delete the webhook", async () => {
      const result = await gitlab.deleteWebhookEndpoint({
        webhookId: webhookId as string,
      });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      await expect(
        gitlab.deleteWebhookEndpoint({
          webhookId: "",
        }),
      ).rejects.toThrow();
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await gitlab.testConnection();
      expect((result as any).success).toBe(true);
    });

    it("should throw an error if connection fails", async () => {
      const badGitlab = new GitLabIntegration({
        GITLAB_PROJECT_ID: "",
        GITLAB_BASE_URL: "http://someurl.net",
        GITLAB_ACCESS_TOKEN: "",
        GITLAB_WEBHOOK_SECRET: "",
      });
      await expect(badGitlab.testConnection()).rejects.toThrow();
    });
  });
});
