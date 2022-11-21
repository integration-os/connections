import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Slack implements TesterClassInterface {
  readonly client;

  constructor({ SLACK_ACCESS_TOKEN }: { SLACK_ACCESS_TOKEN: string }) {
    this.client = axios.create({
      baseURL: "https://slack.com/api/api.test",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
      },
    });
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const {
        data: { ok, error },
      } = await this.client.get();

      if (!ok) throw error;

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Slack: ${err}`);
    }
  }
}
