import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../types/classDefinition";

export default class Tatum implements TesterClassInterface {
  readonly client;

  constructor({ TATUM_API_URL, TATUM_API_KEY }: { TATUM_API_URL: string; TATUM_API_KEY: string }) {
    this.client = axios.create({
      baseURL: `${TATUM_API_URL}/v3/tatum/usage`,
      headers: { "x-api-key": TATUM_API_KEY },
    });
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await this.client.get();
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Tatum: ${err.message}`);
    }
  }
}
