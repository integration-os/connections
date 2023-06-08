import { client, v1 } from "@datadog/datadog-api-client";
import { WebhooksIntegrationApi } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1";
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
  WebhooksProps,
  TestConnection,
} from "../../../types/sourceClassDefinition";

type DatadogRegion = "us1" | "us3" | "us5" | "eu" | "us1-fed";

export default class DatadogIntegration implements IntegrationClassI {
  id: string;

  name: string;

  readonly datadogClient: WebhooksIntegrationApi;

  private webhookUrl: string | undefined = undefined;

  constructor({
    DATADOG_API_KEY,
    DATADOG_APP_KEY,
    DATADOG_REGION,
  }: {
    DATADOG_API_KEY: string;
    DATADOG_APP_KEY: string;
    DATADOG_REGION: DatadogRegion;
  }) {
    const configuration = client.createConfiguration({
      authMethods: {
        apiKeyAuth: DATADOG_API_KEY,
        appKeyAuth: DATADOG_APP_KEY,
      },
    });

    client.setServerVariables(configuration, {
      site: DatadogIntegration.getRegionUrl(DATADOG_REGION),
    });

    this.datadogClient = new v1.WebhooksIntegrationApi(configuration);
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    const response = await this.datadogClient.createWebhooksIntegration({
      body: {
        name: `event-inc-${this.randomHex()}`,
        url: webhookUrl,
      },
    });

    this.webhookUrl = webhookUrl;

    return {
      webhookData: response,
      events,
    };
  }

  async verifyWebhookSignature(): Promise<Truthy> {
    return true;
  }

  async subscribe({ webhookId }: SubscriptionProps): Promise<SubscribeReturns> {
    try {
      const webhook = await this.getWebhooks({ webhookId });

      return {
        webhook,
        events: ["any"],
      };
    } catch (error) {
      console.log(
        `Webhook ${webhookId} retrieval failed. Attempting creation...`,
      );
      const { webhookData } = await this.init({
        webhookUrl: this.webhookUrl,
        events: [],
      });

      return {
        webhook: webhookData,
        events: ["any"],
      };
    }
  }

  async unsubscribe({ webhookId }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    const webhook = await this.deleteWebhookEndpoint({ webhookId });

    return {
      webhook,
      events: [],
    };
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return this.datadogClient
      .getWebhooksIntegration({
        webhookName: webhookId,
      })
      .catch((error) => {
        throw new Error(
          `Unable to retrieve webhook integration ${webhookId}: ${error.message}`,
        );
      });
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    // check whether passed webhookId exists or not
    await this.getWebhooks({ webhookId });

    return ["any"];
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    // check whether passed webhookId exists or not
    const webhook = await this.getWebhooks({ webhookId });

    // this API call always succeeds if it reaches the server regardless of the webhook existence
    await this.datadogClient.deleteWebhooksIntegration({
      webhookName: webhookId,
    });

    return webhook;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.datadogClient.getWebhooksIntegration({
        webhookName: "arbitrary",
      });
    } catch (error) {
      if (error.code !== 404) {
        throw new Error(
          `Unable to connect to Datadog Webhooks API: ${error.message}`,
        );
      }
    }

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }

  // helper functions
  private randomHex(): string {
    return Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  }

  static getRegionUrl(region: DatadogRegion): string {
    switch (region) {
      case "us3":
        return "us3.datadoghq.com";
      case "us5":
        return "us5.datadoghq.com";
      case "eu":
        return "datadoghq.eu";
      case "us1-fed":
        return "ddog-gov.com";
      case "us1":
      default:
        return "api.datadoghq.com";
    }
  }
}
