import { createClient } from "@supabase/supabase-js";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Supabase implements TesterClassInterface {
  readonly client;

  constructor({ SUPABASE_URL, SUPABASE_KEY }: { SUPABASE_URL: string; SUPABASE_KEY: string }) {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const { error } = await this.client.auth.api.listUsers();
      if (error) throw error;
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Supabase: ${err.message}`);
    }
  }
}
