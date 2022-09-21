import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../types/classDefinition";

export default class Airtable implements TesterClassInterface {
  readonly client;
  AIRTABLE_BASE_ID: string;

  constructor({
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
  }: {
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
  }) {
    this.client = axios.create({
      baseURL: "https://api.airtable.com/v0/",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "buildable",
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    this.AIRTABLE_BASE_ID = AIRTABLE_BASE_ID;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const response = await this.client.get(`${this.AIRTABLE_BASE_ID}/this-table-does-not-exist`, {
        validateStatus: (status) => (status < 400 && status >= 200) || status === 404,
      });

      if (response.status === 404) {
        const errorMessage = response.data.error;

        if (
          errorMessage === "NOT_FOUND" ||
          errorMessage.message !==
            `Could not find table this-table-does-not-exist in application ${this.AIRTABLE_BASE_ID}`
        ) {
          throw new Error(`app ${this.AIRTABLE_BASE_ID} not found`);
        }
      }

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Airtable: ${err.message}`);
    }
  }
}
