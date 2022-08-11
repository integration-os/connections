require("dotenv").config();

import { createHmac } from "crypto";
import PagerDutyIntegration from "../catalog/pagerduty/PagerDuty";

const pagerduty = new PagerDutyIntegration({
  PAGERDUTY_API_TOKEN: process.env.PAGERDUTY_API_TOKEN as string,
  PAGERDUTY_FILTER_TYPE: process.env.PAGERDUTY_FILTER_TYPE as string,
  PAGERDUTY_FILTER_ID: process.env.PAGERDUTY_FILTER_ID as string,
});

describe("PagerDuty Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      if (webhookId) {
        await pagerduty.deleteWebhookEndpoint({ webhookId });
        webhookId = undefined;
      }
    });

    it("should create a webhook", async () => {
      const { webhookData, events } = <{ webhookData: any; events: [] }>await pagerduty.init({
        webhookUrl: "https://example.com/webhook",
        events: ["incident.resolved"],
      });

      expect(webhookData).toHaveProperty("id");
      expect(webhookData).toHaveProperty("type");
      expect(webhookData.delivery_method.type).toEqual("http_delivery_method");
      expect(webhookData.delivery_method.url).toEqual("https://example.com/webhook");
      expect(webhookData.delivery_method).toHaveProperty("secret");
      expect(webhookData.delivery_method.secret.length).toBeGreaterThan(0);
      expect(events).toEqual(["incident.resolved"]);

      webhookId = webhookData.id;
    });
  });

  describe("verifyWebhookSignature", () => {
    const testPayload = {
      event: {
        id: "5ac64822-4adc-4fda-ade0-410becf0de4f",
        event_type: "incident.priority_updated",
        resource_type: "incident",
        occurred_at: "2020-10-02T18:45:22.169Z",
        agent: {
          html_url: "https://acme.pagerduty.com/users/PLH1HKV",
          id: "PLH1HKV",
          self: "https://api.pagerduty.com/users/PLH1HKV",
          summary: "Tenex Engineer",
          type: "user_reference",
        },
        client: {
          name: "PagerDuty",
        },
        data: {
          id: "PGR0VU2",
          type: "incident",
          self: "https://api.pagerduty.com/incidents/PGR0VU2",
          html_url: "https://acme.pagerduty.com/incidents/PGR0VU2",
          number: 2,
          status: "triggered",
          incident_key: "d3640fbd41094207a1c11e58e46b1662",
          created_at: "2020-04-09T15:16:27Z",
          title: "A little bump in the road",
          service: {
            html_url: "https://acme.pagerduty.com/services/PF9KMXH",
            id: "PF9KMXH",
            self: "https://api.pagerduty.com/services/PF9KMXH",
            summary: "API Service",
            type: "service_reference",
          },
          assignees: [
            {
              html_url: "https://acme.pagerduty.com/users/PTUXL6G",
              id: "PTUXL6G",
              self: "https://api.pagerduty.com/users/PTUXL6G",
              summary: "User 123",
              type: "user_reference",
            },
          ],
          escalation_policy: {
            html_url: "https://acme.pagerduty.com/escalation_policies/PUS0KTE",
            id: "PUS0KTE",
            self: "https://api.pagerduty.com/escalation_policies/PUS0KTE",
            summary: "Default",
            type: "escalation_policy_reference",
          },
          teams: [
            {
              html_url: "https://acme.pagerduty.com/teams/PFCVPS0",
              id: "PFCVPS0",
              self: "https://api.pagerduty.com/teams/PFCVPS0",
              summary: "Engineering",
              type: "team_reference",
            },
          ],
          priority: {
            html_url: "https://acme.pagerduty.com/account/incident_priorities",
            id: "PSO75BM",
            self: "https://api.pagerduty.com/priorities/PSO75BM",
            summary: "P1",
            type: "priority_reference",
          },
          urgency: "high",
          conference_bridge: {
            conference_number: "+1 1234123412,,987654321#",
            conference_url: "https://example.com",
          },
          resolve_reason: null,
        },
      },
    };

    const testSecret = "1234";

    const testSignature = `v1=asdf,v1=${createHmac("sha256", testSecret)
      .update(JSON.stringify(testPayload))
      .digest("hex")}`;

    it("should return true if the signature is valid", async () => {
      const result = await pagerduty.verifyWebhookSignature({
        signature: testSignature,
        secret: testSecret,
        request: {
          body: JSON.stringify(testPayload),
          headers: {},
        },
      });

      expect(result).toBeTruthy();
    });

    it("should raise an error if the signature is invalid", async () => {
      const invalidSignature = `v1=${createHmac("sha256", "invalid_secret")
        .update(JSON.stringify(testPayload))
        .digest("hex")}`;

      let errorMessage = "no error thrown";

      try {
        await pagerduty.verifyWebhookSignature({
          signature: invalidSignature,
          secret: testSecret,
          request: {
            body: JSON.stringify(testPayload),
            headers: {},
          },
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toEqual("Invalid signature");
    });
  });

  describe("subscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should subscribe to new events", async () => {
      const result = await pagerduty.subscribe({
        webhookId,
        events: ["incident.acknowledged", "incident.escalated"],
      });

      expect(result.events.sort()).toEqual(
        ["incident.resolved", "incident.acknowledged", "incident.escalated"].sort(),
      );
    });

    it("should handle subscription of an existing event", async () => {
      const result = await pagerduty.subscribe({
        webhookId,
        events: ["incident.resolved"],
      });

      expect(result.events).toEqual(["incident.resolved"]);
    });
  });

  describe("unsubscribe", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook(["incident.acknowledged", "incident.escalated"]);
    });

    afterEach(async () => {
      deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should unsubscribe from events", async () => {
      const result = await pagerduty.unsubscribe({
        webhookId,
        events: ["incident.acknowledged"],
      });

      expect(result.events).toEqual(["incident.escalated"]);
    });

    it("should delete webhook if no events remain", async () => {
      const result = await pagerduty.unsubscribe({
        webhookId,
        events: ["incident.acknowledged", "incident.escalated"],
      });

      expect(result.events).toEqual([]);

      let errorMessage = "no error";

      try {
        await pagerduty.client.get(`/${webhookId}`);
      } catch (e) {
        errorMessage = e.response.data.errors.detail;
        webhookId = undefined;
      }

      expect(errorMessage).toMatch(/Not Found/g);
    });
  });

  describe("getWebhooks", () => {
    let webhookIds: string[] = [];

    beforeEach(async () => {
      webhookIds.push(await createWebhook(["incident.acknowledged"]));
      webhookIds.push(await createWebhook(["incident.escalated"]));
    });

    afterEach(async () => {
      webhookIds.forEach(deleteWebhook);
      webhookIds = [];
    });

    it("should return one webhook", async () => {
      const webhook: any = await pagerduty.getWebhooks({
        webhookId: webhookIds[0],
      });

      expect(webhook.id).toEqual(webhookIds[0]);
      expect(webhook.delivery_method.type).toEqual("http_delivery_method");
      expect(webhook.delivery_method.url).toEqual("https://example.com/webhook");
      expect(webhook.delivery_method.secret).toEqual(null);
      expect(webhook.events).toEqual(["incident.acknowledged"]);
    });

    it("should return all webhooks", async () => {
      const result = await pagerduty.getWebhooks({});
      expect((result as any).map((x) => x.id).sort()).toEqual(webhookIds.sort());
    });
  });

  describe("getSubscribedEvents", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook(["incident.acknowledged", "incident.escalated"]);
    });

    afterEach(async () => {
      deleteWebhook(webhookId);
      webhookId = undefined;
    });

    it("should get subscribed events", async () => {
      const events = await pagerduty.getSubscribedEvents({ webhookId });
      expect(events.sort()).toEqual(["incident.acknowledged", "incident.escalated"].sort());
    });
  });

  describe("deleteWebhookEndpoint", () => {
    let webhookId: string | undefined;

    beforeEach(async () => {
      webhookId = await createWebhook();
    });

    afterEach(async () => {
      if (webhookId) {
        deleteWebhook(webhookId);
        webhookId = undefined;
      }
    });

    it("should delete the webhook", async () => {
      const result = await pagerduty.deleteWebhookEndpoint({ webhookId });
      expect(result).toBeTruthy();
      webhookId = undefined;
    });

    it("should throw an error if the webhook does not exist", async () => {
      let errorMessage = "no error thrown";

      try {
        await pagerduty.deleteWebhookEndpoint({ webhookId: "asdf" });
      } catch (err) {
        errorMessage = err.message;
      }

      expect(errorMessage).toMatch(
        /Could not delete PagerDuty webhook: Request failed with status code 404/g,
      );
    });
  });

  describe("testConnection", () => {
    it("should return true if the connection is successful", async () => {
      const result = await pagerduty.testConnection();
      expect(result).toBeTruthy();
    });
  });
});

// Helpers
async function createWebhook(events: string[] = ["incident.resolved"]) {
  const response = await pagerduty.client.post("", {
    webhook_subscription: {
      type: "webhook_subscription",
      delivery_method: {
        type: "http_delivery_method",
        url: "https://example.com/webhook",
      },
      events: events,
      filter: {
        type: pagerduty.PAGERDUTY_FILTER_TYPE,
        ...(pagerduty.PAGERDUTY_FILTER_TYPE === "account_reference"
          ? {}
          : {
              id: pagerduty.PAGERDUTY_FILTER_ID,
            }),
      },
    },
  });

  return response.data.webhook_subscription.id;
}

async function deleteWebhook(webhookId) {
  if (webhookId) {
    await pagerduty.deleteWebhookEndpoint({ webhookId });
  }
}
