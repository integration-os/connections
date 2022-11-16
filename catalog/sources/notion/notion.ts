import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Notion implements TesterClassInterface {
  readonly client;

  constructor({ NOTION_API_TOKEN }: { NOTION_API_TOKEN: string }) {
    this.client = axios.create({
      baseURL: "https://api.notion.com/v1/users",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: `Bearer ${NOTION_API_TOKEN}`,
        "Notion-Version": "2022-06-28",
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
      throw new Error(`Could not connect to Notion: ${err.message}`);
    }
  }
}
