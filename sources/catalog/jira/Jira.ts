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

  readonly v3Client: Version3Client;
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
    this.v3Client = new Version3Client({
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

    const webhookResp = await this.v3Client.webhooks.registerDynamicWebhooks({
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

    //response should contain a single webhook too
    if (webhookResp.webhookRegistrationResult.length == 0) {
      return {
        webhookData: {} as AnyObject,
        events: [],
      };
    } else {
      if (webhookResp.webhookRegistrationResult.length == 1) {
        const webhook = webhookResp.webhookRegistrationResult[0];
        return {
          webhookData: webhook,
          events: events,
        };
      } else {
        throw new Error(`${webhookResp.webhookRegistrationResult.length} items have been returned instead of 1`);
      }
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
    //check if it exists at all
    const webhook = this.getWebhooks({ webhookId });
    if (webhook === undefined) {
      return {
        events: [],
      };
    }

    //as it's been found out so far, API of Jira doesn't support updating webhooks;
    //therefore, the only way to update events of a webhook is
    //to recreate a webhook
    const subscribedEvents = await this.getSubscribedEvents({
      webhookId,
    });
    const eventsAfterSubscribe = subscribedEvents.concat(events);

    try {
      await this.deleteWebhookEndpoint({ webhookId });
    } catch {
      //return the original webhook with the original events
      return {
        webhook: webhook,
        events: subscribedEvents,
      };
    }

    try {
      const updatedWebhook = await this.init({
        webhookUrl: this.webhookUrl,
        events: eventsAfterSubscribe,
      });

      return {
        webhook: updatedWebhook.webhookData,
        events: eventsAfterSubscribe,
      };
    } catch {
      const originalWebhook = await this.init({
        webhookUrl: this.webhookUrl,
        events: subscribedEvents,
      });

      return {
        webhook: originalWebhook.webhookData,
        events: subscribedEvents,
      };
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
    //check if it exists at all
    const webhook = this.getWebhooks({ webhookId });
    if (webhook === undefined) {
      return {
        events: [],
      };
    }

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
      //return the original webhook with the original events
      return {
        webhook: webhook,
        events: subscribedEvents,
      };
    }

    if (eventsAfterUnsubscribe.length == 0) {
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

    const webhooks = await this.v3Client.webhooks.getDynamicWebhooksForApp({
      startAt: startAt,
      maxResults: maxResults,
    });

    /*
    https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-get
    example:
      {
        "maxResults": 3,
        "startAt": 0,
        "total": 3,
        "isLast": true,
        "values": [
          {
            "id": 10000,
            "jqlFilter": "project = PRJ",
            "fieldIdsFilter": [
              "summary",
              "customfield_10029"
            ],
            "events": [
              "jira:issue_updated",
              "jira:issue_created"
            ],
            "expirationDate": "2019-06-01T12:42:30.000+0000"
          },
          { ....
    */

    if (webhookId == undefined) {
      return webhooks.values;
    }

    //There's no way to retrieve a single webhook by its Id from Jira via API
    //therefore, all the webhooks will have to be retrieved first
    //to be filtered out on the client
    const webhookIdAsNum = Number(webhookId);
    const webhook = webhooks.values.find(x => x.id === webhookIdAsNum);
    return webhook;
  }

  async getSubscribedEvents({ webhookId }: WebhooksProps): Promise<Events> {
    const webhook: AnyObject = this.getWebhooks({ webhookId });
    if (webhook !== undefined) {
      return webhook.events;
    }

    const emptyEvents: Events = [];
    return emptyEvents;
  }

  async deleteWebhookEndpoint({
    webhookId,
  }: DeleteWebhookEndpointProps): Promise<Truthy> {
    const webhookIdAsNum = Number(webhookId);
    try {
      await this.v3Client.webhooks.deleteWebhookById({
        webhookIds: [webhookIdAsNum]
      });

      return true;
    } catch (e) {
      console.log((e as Error).message);
      throw new Error(`Unable to delete webhook ${webhookId}: not found; message: ${(e as Error).message}`);
    }
  }

  async testConnection(): Promise<Truthy> {
    try {
      // Test the connection by trying to list all the projects
      await this.v3Client.projects.getAllProjects();

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error("Unable to establish a connection to Jira");
    }
  }
}
