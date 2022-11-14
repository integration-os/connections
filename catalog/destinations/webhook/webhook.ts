import axios from "axios";
import { TestConnection } from "../../../types/destinationClassDefinition";

export default class Webhook {
  WEBHOOK_URL: string;
  WEBHOOK_METHOD: string;
  WEBHOOK_HEADERS: string;

  constructor({
    WEBHOOK_URL,
    WEBHOOK_METHOD,
    WEBHOOK_HEADERS,
  }: {
    WEBHOOK_URL: string;
    WEBHOOK_METHOD: string;
    WEBHOOK_HEADERS: string;
  }) {
    this.WEBHOOK_URL = WEBHOOK_URL;
    this.WEBHOOK_METHOD = WEBHOOK_METHOD;
    this.WEBHOOK_HEADERS = WEBHOOK_HEADERS;
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
