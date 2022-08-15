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

import { Version3Client } from "jira.js";

export default class JiraIntegration implements IntegrationClassI {
  id: string;
  name: string;

  readonly jiraClient: Version3Client;
  private webhookUrl: string | undefined = undefined;
  JIRA_PROJECT_ID: string;

  constructor({
    JIRA_PROJECT_ID,
    JIRA_HOST,
    JIRA_OAUTH2_ACCESS_TOKEN,
  }: {
    JIRA_PROJECT_ID: string;
    JIRA_HOST: string;
    JIRA_OAUTH2_ACCESS_TOKEN: string;
  }) {
    this.jiraClient = new Version3Client({
      host: JIRA_HOST,
      authentication: {
        oauth2: {
          accessToken: JIRA_OAUTH2_ACCESS_TOKEN,
        },
      },
      newErrorHandling: true,
    });

    this.JIRA_PROJECT_ID = JIRA_PROJECT_ID;
  }

  async init({ webhookUrl, events }: InitProps): Promise<InitReturns> {
    /*
      although Jira supports creating multiple webhooks in one fell swoop too,
      creating multiple ones in this case would greatly overcomplicate the code,
      and isn't necessary either;
      therefore, we're creating a single webhook
    */

    const req = {
      jqlFilter: `project = ${this.JIRA_PROJECT_ID}`,
      events: events
    };

    const webhookResp = await this.jiraClient.webhooks.registerDynamicWebhooks({
      webhooks: [req],
      url: webhookUrl,
    });

    this.webhookUrl = webhookUrl;

    /*
      https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post
      example of a response:
      {
        "webhookRegistrationResult": [
          {
            "createdWebhookId": 58,
            "errors": [
              "<string>"
            ]
          }
        ]
      }
    */

    //response will contain a single webhook too
    if (webhookResp.webhookRegistrationResult.length == 0) {
      return {
        webhookData: {} as AnyObject,
        events: [],
      };
    } else {
      const webhook = webhookResp.webhookRegistrationResult[0];
      return {
        webhookData: webhook,
        events: events,
      };
    }
  }

  verifyWebhookSignature({
    request,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): Truthy {

    /*
      In Jira when OAuth2 is used verification or authentication of webhooks isn't supported yet:
        (1) https://community.atlassian.com/t5/Jira-Software-questions/How-to-verify-callback-api-is-called-by-Jira-Webhooks/qaq-p/1504953
        (2) https://community.atlassian.com/t5/Jira-Service-Management/Verify-Webhooks-coming-from-Jira/qaq-p/1515631
          > "For the rest, when configuring a webhook via the Jira UI, the headers aren't actually configurable and therefore the requests cannot be sent with an authentication header."
          > "Webhooks authentication is only supported when building apps/add-ons"

      Therefore, either return true, or throw an exception:
      throw new Error("REST API of Jira doesn't support webhooks authentication");
    */

    return true;
  }

  async subscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<SubscribeReturns> {
    //as it's been found out so far, API of Jira doesn't support updating webhooks;
    //therefore, the only way to update events of a webhook is
    //to recreate a webhook

    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterSubscribe = subscribedEvents.concat(events);
    try {
      await this.deleteWebhookEndpoint({ webhookId });
      const updatedWebhook = await this.init({
        webhookUrl: this.webhookUrl,
        events: eventsAfterSubscribe,
      });

      return {
        webhook: updatedWebhook.webhookData,
        events: eventsAfterSubscribe,
      };
    } catch {
      throw new Error("Error updating a webhook (delete/create); Note that Jira doesn't support updating webhooks.");
    }
  }

  async unsubscribe({
    webhookId,
    events,
  }: SubscriptionProps): Promise<{
    events: Events;
    webhook?: any;
    webhooks?: any;
  }> {
    //as it's been found out so far, API of Jira doesn't support updating webhooks;
    //therefore, the only way to update events of a webhook is
    //to recreate a webhook

    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });

    const eventsAfterUnsubscribe = subscribedEvents.filter(
      (event: string) => !events.includes(event)
    );

    try {
      await this.deleteWebhookEndpoint({ webhookId });
    } catch {
      throw new Error("Error updating a webhook (delete); Note that Jira doesn't support updating webhooks.");
    }

    if (eventsAfterUnsubscribe.length === 0) {
      return {
        events: [],
      };
    }

    try {
      const updatedWebhook = await this.init({
        webhookUrl: this.webhookUrl,
        events: eventsAfterUnsubscribe,
      });

      return {
        webhook: updatedWebhook.webhookData,
        events: eventsAfterUnsubscribe,
      };
    } catch {
      throw new Error("Error updating a webhook (create); Note that Jira doesn't support updating webhooks.");
    }
  }

  async getWebhooks({
    webhookId,
  }: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    const startAt = 0;
    //mind the max amount of the returned items;
    //theoretically it may return less values than necessary; however, on practise it probably won't happen
    //
    //however, this function signature doesn't support additional parameters
    //through which a page number could've been passed,
    //one will have to increase this number if need be
    const maxResults = 100;

    const webhooks = await this.jiraClient.webhooks.getDynamicWebhooksForApp({
      startAt: startAt,
      maxResults: maxResults,
    });

    //There's no way to retrieve a single webhook by its Id from Jira via API
    //therefore, all the webhooks will have to be retrieved first
    //and then filtered on the client
    const webhookIdAsNum = Number(webhookId);
    const webhook = webhooks.values.filter(x => x.id === webhookIdAsNum);
    return webhook;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = this.getWebhooks({ webhookId });
    return webhook.events;
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    const webhookIdAsNum = Number(webhookId);
    try {
      await this.jiraClient.webhooks.deleteWebhookById({
        webhookIds: [webhookIdAsNum]
      });
      return true;
    } catch (e) {
      console.log((e as Error).message);
      throw new Error("Unable to delete webhook: " + (e as Error).message);
    }
  }

  async testConnection(): Promise<Truthy> {
    try {
      // Test the connection by trying to list all the projects
      await this.jiraClient.projects.getAllProjects();

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error("Unable to establish a connection with Jira.");
    }
  }
}
