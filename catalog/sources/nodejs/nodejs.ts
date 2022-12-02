import { TestConnection } from "../../../types/sourceClassDefinition";

export default class Nodejs {
  constructor() {}

  async init({ webhookUrl, events }) {
    return {
      webhookData: {},
      events,
    };
  }

  async verifyWebhookSignature({ request, signature, secret }) {
    // Validation falls on the user to implement
    return true;
  }

  async subscribe({ webhookId, events }) {
    return {
      webhook: {},
      events: [],
    };
  }

  async unsubscribe({ webhookId, events }) {
    return {
      events: [],
      webhook: {},
    };
  }

  async getWebhooks() {
    return [];
  }

  async getSubscribedEvents({ webhookId }) {
    return [];
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return true;
  }
  
  async testConnection(): Promise<TestConnection> {
    return {
      success: true,
      message: "Connection tested successfully!",
    };
  }
}
