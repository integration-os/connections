require("dotenv").config();

import GitHubIntegration from "../catalog/sources/github-repos/github-repos";
import { createHmac } from "crypto";

const github = new GitHubIntegration({
  GITHUB_REPOS_ACCOUNT_USERNAME: process.env.GITHUB_REPOS_ACCOUNT_USERNAME as string,
  GITHUB_REPOS_REPOSITORY: process.env.GITHUB_REPOS_REPOSITORY as string,
  GITHUB_REPOS_ACCESS_TOKEN: process.env.GITHUB_REPOS_ACCESS_TOKEN as string,
});

describe("GitHub Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await github.octokit.request("DELETE /repos/{owner}/{repo}/hooks/{id}", {
        owner: github.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: github.GITHUB_REPOS_REPOSITORY,
        id: webhookId,
      });
    });

    it("should create a webhook", async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      const { webhookData, events } = await github.init({
        webhookUrl: testWebhookUrl,
        events: testEvents,
      });

      expect(webhookData).toBeDefined();
      expect((webhookData as any).id).toBeDefined();
      expect((webhookData as any).config.url).toBe(testWebhookUrl);

      expect(events).toEqual(testEvents);

      webhookId = (webhookData as any).id;
    });
  });

  describe("verifyWebhookSignature", () => {
    /*
    Testing the signature is not possible because the signature is generated
    by the GitHub API, and we cannot mimic it in a reasonable manner.
    Therefore, we generate the SHA256 HMAC signature of an arbitrary payload
    and compare it with verifyWebhookSignature.
     */

    const testPayload = {
      action: "opened",
      number: 1,
      pull_request: {
        number: 1,
        head: {
          ref: "feature-branch",
          sha: "abc123",
        },
        base: {
          ref: "master",
          sha: "abc123",
        },
      },
    };

    const testSignature = `sha256=${createHmac("sha256", github.GITHUB_REPOS_ACCESS_TOKEN)
      .update(JSON.stringify(testPayload))
      .digest("hex")}`;

    it("should return true if the signature is valid", async () => {
      const result = await github.verifyWebhookSignature({
        request: {
          body: JSON.stringify(testPayload),
          headers: {
            "X-Hub-Signature-256": testSignature, // inserted automatically by GitHub as part of the request
          },
        },
        signature: testSignature,
        secret: github.GITHUB_REPOS_ACCESS_TOKEN,
      });

      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      const invalidSignature = createHmac("sha256", "invalid_secret")
        .update(JSON.stringify(testPayload))
        .digest("hex");

      let errorMessage = "no error thrown";

      try {
        await github.verifyWebhookSignature({
          request: {
            body: JSON.stringify(testPayload),
            headers: {
              "X-Hub-Signature-256": invalidSignature, // inserted automatically by GitHub as part of the request
            },
          },
          signature: invalidSignature,
          secret: github.GITHUB_REPOS_ACCESS_TOKEN,
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toBe("Invalid signature");
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should subscribe to the event", async () => {
      const result = await github.subscribe({
        events: ["fork"],
        webhookId,
      });

      expect(result).toBeTruthy();

      expect(result?.webhook?.events).toContain("fork");
      expect(result?.webhook?.events.length).toBeGreaterThan(1);
    });

    it("should handle subscription of an existing event", async () => {
      const result = await github.subscribe({
        events: ["push"],
        webhookId,
      });

      expect(result).toBeTruthy();

      expect(result?.webhook?.events.length).toBe(2);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should unsubscribe from the event(s)", async () => {
      const result = await github.unsubscribe({
        webhookId,
        events: ["pull_request"], // originally subscribed to ["push","pull_request"]
      });

      expect(result).toBeTruthy();
      expect((result as any).events).toEqual(["push"]);
    });

    it("should delete webhook if no events remain", async () => {
      const result = await github.unsubscribe({
        webhookId,
        events: ["push", "pull_request"], // originally subscribed to ["push","pull_request"]
      });

      expect(result).toBeTruthy();
      expect((result as any).webhook.events).toEqual([]);

      let errorStatus = 0;

      try {
        await github.octokit.request("GET /repos/{owner}/{repo}/hooks/{id}", {
          owner: github.GITHUB_REPOS_ACCOUNT_USERNAME,
          repo: github.GITHUB_REPOS_REPOSITORY,
          id: webhookId,
        });
      } catch (err) {
        errorStatus = err.status;
        webhookId = undefined;
      }

      expect(errorStatus).toBe(404);
    });
  });

  describe("getWebhooks", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the webhook", async () => {
      const webhook = await github.getWebhooks({
        webhookId,
      });

      expect(webhook).toBeDefined();
    });

    it("should raise an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await github.getWebhooks({
          webhookId: "invalid_webhook_id",
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toBe("Not Found");
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should return the subscribed events", async () => {
      const events = await github.getSubscribedEvents({
        webhookId,
      });

      expect(events).toBeDefined();
      expect(events.length).toBe(2);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["push", "pull_request"];

      webhookId = await createTestWebhook(testWebhookUrl, testEvents);
    });

    afterEach(async () => {
      if (webhookId) {
        await deleteTestWebhook(webhookId);
      }
    });

    it("should delete the webhook", async () => {
      const result = await github.deleteWebhookEndpoint({
        webhookId: webhookId as string,
      });

      expect(result).toBeTruthy();

      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await github.deleteWebhookEndpoint({
          webhookId: "invalid_webhook_id",
        });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/(Not Found)/g);
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const result = await github.testConnection();
      expect((result as any).success).toBe(true);
    });

    it("should throw an error if connection fails", async () => {
      let badGithub = new GitHubIntegration({
        GITHUB_REPOS_ACCOUNT_USERNAME: "a-wrong-user",
        GITHUB_REPOS_REPOSITORY: "wrong-repo",
        GITHUB_REPOS_ACCESS_TOKEN: "ghp_5PqohxaQWid2WnTOLRN64oQ01aQ5BO34pkuy",
      });

      let errorMessage = "no error thrown";

      try {
        await badGithub.testConnection();
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/(Unable to establish a connection with GitHub)/g);
    });

    it("should throw an error if GitHub response code is non-2xx", async () => {
      let badGitHub: GitHubIntegration = mockTestConnectionIntegration() as GitHubIntegration;

      let errorMessage = "no error thrown";

      try {
        await badGitHub.testConnection();
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(/(GitHub API returned status code)/g);
    });
  });
});

// helper functions
async function createTestWebhook(webhookUrl: string, events: string[]): Promise<string> {
  const webhookData = await github.octokit.request("POST /repos/{owner}/{repo}/hooks", {
    owner: github.GITHUB_REPOS_ACCOUNT_USERNAME,
    repo: github.GITHUB_REPOS_REPOSITORY,
    name: "web", // "web" stands for "webhook"
    active: true,
    events: events,
    config: {
      url: webhookUrl,
      content_type: "json",
      insecure_ssl: "0",
    },
  });

  return webhookData.data.id.toString();
}

async function deleteTestWebhook(webhookId: number | string) {
  await github.octokit.request("DELETE /repos/{owner}/{repo}/hooks/{id}", {
    owner: github.GITHUB_REPOS_ACCOUNT_USERNAME,
    repo: github.GITHUB_REPOS_REPOSITORY,
    id: webhookId,
  });
}

function mockTestConnectionIntegration(): Partial<GitHubIntegration> {
  return new (class extends GitHubIntegration {
    public octokit;

    constructor() {
      super({
        GITHUB_REPOS_ACCOUNT_USERNAME: "a-wrong-user",
        GITHUB_REPOS_REPOSITORY: "wrong-repo",
        GITHUB_REPOS_ACCESS_TOKEN: "ghp_5PqohxaQWid2WnTOLRN64oQ01aQ5BO34pkuy",
      });

      this.octokit = {
        request: jest.fn(() => {
          return Promise.resolve({
            status: 404,
          });
        }),
      };
    }
  })();
}
