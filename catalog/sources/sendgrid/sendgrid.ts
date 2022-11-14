import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Sendgrid implements TesterClassInterface {
  readonly client;

  constructor({ SENDGRID_ACCESS_TOKEN }: { SENDGRID_ACCESS_TOKEN: string }) {
    this.client = axios.create({
      baseURL: "https://api.sendgrid.com/v3/templates?page_size=1",
      headers: {
        Authorization: `Bearer ${SENDGRID_ACCESS_TOKEN}`,
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
      throw new Error(`Could not connect to Sendgrid: ${err.message}`);
    }
  }
}
