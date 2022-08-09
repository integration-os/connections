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

import axios, { AxiosInstance } from "axios";

interface GitLabEvents {
  confidential_issues_events?: boolean;
  confidential_note_events?: boolean;
  deployment_events?: boolean;
  enable_ssl_verification?: boolean;
  issues_events?: boolean;
  job_events?: boolean;
  merge_requests_events?: boolean;
  note_events?: boolean;
  pipeline_events?: boolean;
  push_events_branch_filter?: boolean;
  push_events?: boolean;
  releases_events?: boolean;
  tag_push_events?: boolean;
  wiki_page_events?: boolean;
}

interface GitLabWebhook extends GitLabEvents {
  id: number;
  url: string;
  created_at: string;
  token?: string;
}

export default class GitLabIntegration implements IntegrationClassI {
  id: string;
  name: string;

  private readonly GITLAB_ACCESS_TOKEN: string; // Generated from GitLab account
  GITLAB_PROJECT_ID: string; // Can either be GitLab-assigned ID or URL-encoded path
  GITLAB_BASE_URL: string = "https://gitlab.com";

  readonly GITLAB_WEBHOOK_AUTH_KEY;

  readonly client: AxiosInstance;

  constructor({
    GITLAB_ACCESS_TOKEN,
    GITLAB_PROJECT_ID,
    GITLAB_WEBHOOK_AUTH_KEY,
    GITLAB_BASE_URL,
  }: {
    GITLAB_ACCESS_TOKEN: string;
    GITLAB_PROJECT_ID: string;
    GITLAB_WEBHOOK_AUTH_KEY: string;
    GITLAB_BASE_URL?: string;
  }) {
    this.GITLAB_BASE_URL = GITLAB_BASE_URL || this.GITLAB_BASE_URL;

    this.client = axios.create({
      baseURL: `${this.GITLAB_BASE_URL}/api/v4`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: `Bearer ${GITLAB_ACCESS_TOKEN}`,
      },
    });

    this.GITLAB_ACCESS_TOKEN = GITLAB_ACCESS_TOKEN;
    this.GITLAB_PROJECT_ID = GITLAB_PROJECT_ID;
    this.GITLAB_WEBHOOK_AUTH_KEY = GITLAB_WEBHOOK_AUTH_KEY;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const eventsObject = GitLabIntegration.extractEventsObject(events);

    const response = await this.client.post(`/projects/${this.GITLAB_PROJECT_ID}/hooks`, {
      url: webhookUrl,
      token: this.GITLAB_WEBHOOK_AUTH_KEY,
      ...eventsObject,
    });

    return {
      webhookData: response.data as GitLabWebhook,
      events: GitLabIntegration.extractEventsArray(response.data as GitLabWebhook),
    };
  }

  verifyWebhookSignature({ signature: signature }: VerifyWebhookSignatureProps): Truthy {
    // GitLab does not sign its webhook payloads.
    // Instead, it resends the token set during the webhook creation process.
    // Thus, we can verify the signature by comparing "signature" with GITLAB_WEBHOOK_AUTH_KEY.
    if (signature !== this.GITLAB_WEBHOOK_AUTH_KEY) {
      throw Error("Invalid webhook signature");
    }

    return true;
  }

  async subscribe({ webhookId, events }: SubscriptionProps): Promise<SubscribeReturns> {
    const eventsObject = GitLabIntegration.extractEventsObject(events);

    const response = await this.client.put(
      `/projects/${this.GITLAB_PROJECT_ID}/hooks/${webhookId}`,
      {
        ...eventsObject,
      },
    );

    // return new webhooks
    return {
      webhook: response.data,
      events: GitLabIntegration.extractEventsArray(response.data),
    };
  }

  async unsubscribe({ webhookId, events }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const eventsObject = GitLabIntegration.extractEventsObject(events, true);

    const response = await this.client.put(
      `/projects/${this.GITLAB_PROJECT_ID}/hooks/${webhookId}`,
      {
        ...eventsObject,
      },
    );

    const eventList = GitLabIntegration.extractEventsArray(response.data);

    if (eventList.length === 0) {
      await this.deleteWebhookEndpoint({ webhookId });
    }

    // return new webhooks
    return {
      webhook: response.data,
      events: eventList,
    };
  }

  async getWebhooks({ webhookId }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    try {
      const response = await this.client.get(
        `/projects/${this.GITLAB_PROJECT_ID}/hooks/${webhookId}`,
      );

      return response.data;
    } catch (e) {
      throw new Error(`Unable to get GitLab webhooks: ${e.message}`);
    }
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook = await this.getWebhooks({ webhookId });

    return GitLabIntegration.extractEventsArray(webhook as GitLabWebhook);
  }

  async deleteWebhookEndpoint({ webhookId }: DeleteWebhookEndpointProps): Promise<Truthy> {
    await this.client.delete(`/projects/${this.GITLAB_PROJECT_ID}/hooks/${webhookId}`);

    return true;
  }

  async testConnection(): Promise<Truthy> {
    await this.client.get(`/projects/${this.GITLAB_PROJECT_ID}`);

    return {
      success: true,
      message: "Connection to GitLab Webhooks API is healthy",
    };
  }

  // helper methods
  private static extractEventsObject(events: string[], unsubscribe: boolean = false): GitLabEvents {
    const eventObject = {};

    for (const event of events) {
      eventObject[event] = !unsubscribe;
    }

    return eventObject;
  }

  private static extractEventsArray(events: GitLabEvents): string[] {
    const eventArray = [];

    for (const event in events) {
      if (events[event] === true && event !== "enable_ssl_verification") {
        eventArray.push(event);
      }
    }

    return eventArray;
  }
}
