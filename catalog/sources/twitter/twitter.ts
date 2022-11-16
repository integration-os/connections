import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Twitter implements TesterClassInterface {
  readonly client;

  constructor({ TWITTER_BEARER_TOKEN }: { TWITTER_BEARER_TOKEN: string }) {
    this.client = axios.create({
      baseURL: "https://api.twitter.com/2/tweets/search/recent?query=asdf",
      headers: {
        "User-Agent": "buildable",
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
      },
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
      throw new Error(`Could not connect to Twitter: ${err.message}`);
    }
  }
}
