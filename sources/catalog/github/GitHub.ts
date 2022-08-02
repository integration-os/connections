// for the list of available events visit:
// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

import { Octokit } from "@octokit/core";

import {
  AnyObject,
  DeleteWebhookEndpointProps,
  Events,
  InitProps,
  InitReturns,
  IntegrationClassI,
  SubscribeReturns,
  SubscriptionProps,
  Truthy,
  VerifyWebhookSignatureProps,
  WebhooksProps,
} from "../../types/classDefinition";
import crypto from "crypto";

export default class GitHubIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly GITHUB_ACCESS_TOKEN: string; // Generated from GitHub account
  GITHUB_ACCOUNT_ID: string; // Account name i.e. buildable
  GITHUB_REPOSITORY: string; // Repository name i.e. event-integrations

  readonly octokit: Octokit;

  constructor({
    GITHUB_ACCESS_TOKEN,
    GITHUB_ACCOUNT_ID,
    GITHUB_REPOSITORY,
  }: {
    GITHUB_ACCESS_TOKEN: string;
    GITHUB_ACCOUNT_ID: string;
    GITHUB_REPOSITORY: string;
  }) {
    this.octokit = new Octokit({
      auth: GITHUB_ACCESS_TOKEN,
      userAgent: "buildable",
    });

    this.GITHUB_ACCESS_TOKEN = GITHUB_ACCESS_TOKEN;
    this.GITHUB_ACCOUNT_ID = GITHUB_ACCOUNT_ID;
    this.GITHUB_REPOSITORY = GITHUB_REPOSITORY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const webhook = await this.octokit.request(
      "POST /repos/{owner}/{repo}/hooks",
      {
        owner: this.GITHUB_ACCOUNT_ID,
        repo: this.GITHUB_REPOSITORY,
        name: "web", // "web" stands for "webhook"
        active: true,
        events: events,
        config: {
          url: webhookUrl,
          secret: this.GITHUB_ACCESS_TOKEN,
          content_type: "json",
          insecure_ssl: "0",
        },
      }
    );

    return { webhookData: webhook.data, events };
  }

  verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Truthy {
    // Override secret because the webhook creation
    // returns "******" as the secret value
    secret = this.GITHUB_ACCESS_TOKEN;

    const hash = crypto
      .createHmac("sha256", secret)
      .update(request.body, "utf8")
      .digest("hex");

    if (`sha256=${hash}` !== signature) {
      throw new Error(`Invalid signature`);
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
        owner: this.GITHUB_ACCOUNT_ID,
        repo: this.GITHUB_REPOSITORY,
        hook_id: webhook.id,
        add_events: events,
        config: {
          ...webhook.config,
        },
      }
    );

    // return new webhooks
    return {
      webhook: newWebhook.data,
      events: newWebhook.data.events,
    };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhook: any = await this.getWebhooks({ webhookId });

    // update existing webhook events
    let newWebhook = await this.octokit.request(
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: this.GITHUB_ACCOUNT_ID,
        repo: this.GITHUB_REPOSITORY,
        hook_id: webhook.id,
        remove_events: events,
        config: {
          ...webhook.config,
        },
      }
    );

    if (newWebhook.data.events.length === 0) {
      // delete webhook if no events left
      await this.deleteWebhookEndpoint({ webhookId: webhook.id });
    }

    // return new webhooks
    return {
      webhook: newWebhook.data,
      events: newWebhook.data.events,
    };
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const webhook = await this.octokit.request(
      "GET /repos/{owner}/{repo}/hooks/{hook_id}",
      {
        owner: this.GITHUB_ACCOUNT_ID,
        repo: this.GITHUB_REPOSITORY,
        hook_id: Number(webhookId),
      }
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
        owner: this.GITHUB_ACCOUNT_ID,
        repo: this.GITHUB_REPOSITORY,
        id: webhookId,
      });

      return true;
    } catch (e) {
      console.log((e as Error).message);
      throw new Error("Unable to delete webhook: " + (e as Error).message);
    }
  }

  async testConnection(): Promise<Truthy> {
    try {
      const data = await this.octokit.request("GET /");

      if (data.status > 299) {
        throw new Error(`GitHub API returned status code ${data.status}`);
      }

      return {
        success: true,
        message: "Connection to GitHub Webhooks API is healthy",
      };
    } catch (e) {
      console.log((e as Error).message);
      throw new Error(
        "Unable to establish a connection with GitHub: " + (e as Error).message
      );
    }
  }
}
