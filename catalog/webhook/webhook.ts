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
  
  async testConnection(): Promise<void> {}
}
