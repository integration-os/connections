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

interface GitLabWebhook {
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

  readonly GITLAB_WEBHOOK_SECRET;

  readonly client: AxiosInstance;

  constructor({
    GITLAB_ACCESS_TOKEN,
    GITLAB_PROJECT_ID,
    GITLAB_WEBHOOK_SECRET,
    GITLAB_BASE_URL,
  }: {
    GITLAB_ACCESS_TOKEN: string;
    GITLAB_PROJECT_ID: string;
    GITLAB_WEBHOOK_SECRET: string;
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
    this.GITLAB_WEBHOOK_SECRET = GITLAB_WEBHOOK_SECRET;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const eventsObject = GitLabIntegration.extractEventsObject(events);

    console.log("events: ", events);
    console.log("eventsObject: ", eventsObject);

    const response = await this.client.post(`/projects/${this.GITLAB_PROJECT_ID}/hooks`, {
      url: webhookUrl,
      token: this.GITLAB_WEBHOOK_SECRET,
      ...eventsObject,
    });

    return {
      webhookData: response.data as GitLabWebhook,
      events: GitLabIntegration.extractEventsArray(response.data as GitLabWebhook),
    };
  }

  async verifyWebhookSignature({ signature: signature }: VerifyWebhookSignatureProps): Promise<Truthy> {
    // GitLab does not sign its webhook payloads.
    // Instead, it resends the token set during the webhook creation process.
    // Thus, we can verify the signature by comparing "signature" with GITLAB_WEBHOOK_SECRET.
    if (signature !== this.GITLAB_WEBHOOK_SECRET) {
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
      message: "Connection tested successfully!",
    };
  }

  // helper methods
  private static extractEventsObject(events: string[], unsubscribe: boolean = false) {
    const eventObject = {};

    for (const event of events) {
      eventObject[event] = !unsubscribe;
    }

    if (!events.includes("push_events")) {
      eventObject["push_events"] = false;
    }

    return eventObject;
  }

  private static extractEventsArray(events: any): string[] {
    const eventArray = [];

    for (const event in events) {
      if (events[event] === true && event !== "enable_ssl_verification") {
        eventArray.push(event);
      }
    }

    return eventArray;
  }
}
