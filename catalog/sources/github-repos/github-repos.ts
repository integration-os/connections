// for the list of available events visit:
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

import { Octokit } from "@octokit/core";

import crypto from "crypto";
import {
  AnyObject,
  DeleteWebhookEndpointProps,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  TestConnection,
  Truthy,
  VerifyWebhookSignatureProps,
  WebhooksProps,
} from "../../../types/sourceClassDefinition";

export default class GitHubReposIntegration implements IntegrationClassI {
  id: string;

  name: string;

  readonly GITHUB_REPOS_ACCESS_TOKEN: string; // Generated from GitHub account

  GITHUB_REPOS_ACCOUNT_USERNAME: string; // Account name i.e. event-inc

  GITHUB_REPOS_REPOSITORY: string; // Repository name i.e. event-integrations

  readonly octokit: Octokit;

  constructor({
    GITHUB_REPOS_ACCESS_TOKEN,
    GITHUB_REPOS_ACCOUNT_USERNAME,
    GITHUB_REPOS_REPOSITORY,
  }: {
    GITHUB_REPOS_ACCESS_TOKEN: string;
    GITHUB_REPOS_ACCOUNT_USERNAME: string;
    GITHUB_REPOS_REPOSITORY: string;
  }) {
    this.octokit = new Octokit({
      auth: GITHUB_REPOS_ACCESS_TOKEN,
      userAgent: "event-inc",
    });

    this.GITHUB_REPOS_ACCESS_TOKEN = GITHUB_REPOS_ACCESS_TOKEN;
    this.GITHUB_REPOS_ACCOUNT_USERNAME = GITHUB_REPOS_ACCOUNT_USERNAME;
    this.GITHUB_REPOS_REPOSITORY = GITHUB_REPOS_REPOSITORY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhook = await this.octokit.request(
      "POST /repos/{owner}/{repo}/hooks",
      {
        owner: this.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: this.GITHUB_REPOS_REPOSITORY,
        name: "web", // "web" stands for "webhook"
        active: true,
        events,
        config: {
          url: webhookUrl,
          secret: this.GITHUB_REPOS_ACCESS_TOKEN,
          content_type: "json",
          insecure_ssl: "0",
        },
      },
    );

    return { webhookData: webhook.data, events };
  }

  async verifyWebhookSignature({
    request,
    signature,
  }: VerifyWebhookSignatureProps): Promise<Truthy> {
    // Override secret because the webhook creation
    // returns "******" as the secret value
    const secret = this.GITHUB_REPOS_ACCESS_TOKEN;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("hex");

    if (`sha256=${hash}` !== signature) {
      throw new Error("Invalid signature");
    }

    return true;
  }

  async subscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    const webhook: any = await this.getWebhooks({ webhookId });

    // update existing webhook events
    const newWebhook = await this.octokit.request(
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: this.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: this.GITHUB_REPOS_REPOSITORY,
        hook_id: webhook.id,
        add_events: events,
        config: {
          ...webhook.config,
        },
      },
    );

    // return new webhooks
    return {
      webhook: newWebhook.data,
      events,
    };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhook: any = await this.getWebhooks({ webhookId });

    // update existing webhook events
    const response = await this.octokit.request(
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: this.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: this.GITHUB_REPOS_REPOSITORY,
        hook_id: webhook.id,
        remove_events: events,
        config: {
          ...webhook.config,
        },
      },
    );

    const newWebhook = response.data;

    if (newWebhook.events.length === 0) {
      // delete webhook if no events left
      await this.deleteWebhookEndpoint({ webhookId: webhook.id });
    }

    // return new webhooks
    return {
      webhook: newWebhook,
      events: newWebhook.events,
    };
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const webhook = await this.octokit.request(
      "GET /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: this.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: this.GITHUB_REPOS_REPOSITORY,
        hook_id: Number(webhookId),
      },
    );

    return webhook.data;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = await this.getWebhooks({ webhookId });

    return webhook.events;
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    try {
      await this.octokit.request("DELETE /repos/{owner}/{repo}/hooks/{id}", {
        owner: this.GITHUB_REPOS_ACCOUNT_USERNAME,
        repo: this.GITHUB_REPOS_REPOSITORY,
        id: webhookId,
      });

      return true;
    } catch (e) {
      console.log((e as Error).message);
      throw new Error(`Unable to delete webhook: ${(e as Error).message}`);
    }
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const data = await this.octokit.request("GET /");

      if (data.status > 299) {
        throw new Error(`GitHub API returned status code ${data.status}`);
      }

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (e) {
      console.log((e as Error).message);
      throw new Error(
        `Unable to establish a connection with GitHub: ${(e as Error).message}`,
      );
    }
  }
}
