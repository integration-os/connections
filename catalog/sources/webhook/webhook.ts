import axios from "axios";
import { TestConnection } from "../../../types/sourceClassDefinition";

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

export default class Webhook {
  WEBHOOK_URL: string;
  WEBHOOK_METHOD: Method;
  WEBHOOK_HEADERS: string;

  constructor({
    WEBHOOK_URL,
    WEBHOOK_METHOD,
    WEBHOOK_HEADERS,
  }: {
    WEBHOOK_URL: string;
    WEBHOOK_METHOD: Method;
    WEBHOOK_HEADERS: string;
  }) {
    this.WEBHOOK_URL = WEBHOOK_URL;
    this.WEBHOOK_METHOD = WEBHOOK_METHOD;
    this.WEBHOOK_HEADERS = WEBHOOK_HEADERS;
  }

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
      events: ["event.received"],
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
    return ["event.received"];
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return true;
  }
  
  async testConnection(): Promise<TestConnection> {
    try {
      await axios({
        method: this.WEBHOOK_METHOD,
        url: this.WEBHOOK_URL,
        headers: JSON.parse(this.WEBHOOK_HEADERS)
      });
  
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Unable to make a ${this.WEBHOOK_METHOD} request: ${err.message}`);
    }
  }
}
