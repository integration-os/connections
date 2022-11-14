import axios from "axios";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Twilio implements TesterClassInterface {
  readonly client;

  constructor({
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
  }: {
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
  }) {
    this.client = axios.create({
      baseURL: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}.json`,
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
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
      throw new Error(`Could not connect to Twilio: ${err.message}`);
    }
  }
}
