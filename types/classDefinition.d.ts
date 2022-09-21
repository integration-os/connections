export interface AnyObject {
  [key: string]: any;
}

export type Events = string[];
export type Truthy = boolean | number | string | AnyObject;

export interface IntegrationClassI {
  id: string;
  name: string;

  /**
   * Creates webhooks for the given events
   *
   * @param {String} webhookUrl - The URL to send the webhook to
   * @param {Array<String>} events - The events to subscribe to
   *
   * @returns Stripe webhook endpoint object
   */
  init: (props: InitProps) => Promise<InitReturns>;

  /**
   * Verifies a webhook event signature
   *
   * @param {Object} request - The request object
   * @param {String} signature - The event signature
   * @param {String} secret - The secret key
   *
   * @returns true if the signature is valid or throws an error
   */
  verifyWebhookSignature: (props: VerifyWebhookSignatureProps) => Promise<Truthy>;

  /**
   * Subscribes events to an existing webhook
   *
   * @param {String} webhookUrl - The URL to send the webhook to
   * @param {String} webhookIds - The IDs of the owned webhooks
   * @param {Array<String>} events - The events to subscribe to
   *
   * @returns The updated subscribed events
   */
  subscribe: (props: SubscriptionProps) => Promise<SubscribeReturns>;

  /**
   * Unsubscribes events from an existing webhook
   *
   * @param {Number[]} webhookIds - The IDs of the owned webhooks
   * @param {String[]} events - The events to unsubscribe
   *
   * @returns The updated subscribed events
   */
  unsubscribe: (
    props: SubscriptionProps,
  ) => Promise<{ events: Events; webhook?: any; webhooks?: any }>;

  /**
   * Gets all webhooks
   *
   * @returns An array of webhooks
   */
  getWebhooks: (props?: WebhooksProps) => Promise<AnyObject | AnyObject[]>;

  /**
   * Gets all currently subscribed events by
   * grabbing the topic from each webhook
   *
   * @returns An array of subscribed events
   */
  getSubscribedEvents: (props: WebhooksProps) => Promise<Events>;

  /**
   * Deletes a webhook
   *
   * @param {Array<String>} webhookId - The ID of the webhook to delete
   *
   * @returns The deleted webhook object
   */
  deleteWebhookEndpoint: (props: DeleteWebhookEndpointProps) => Promise<Truthy>;

  /**
   * Tests an account's credentials
   *
   * @returns - A success response or throws an error
   */
  testConnection: () => Promise<Truthy>;
}

export interface InitProps {
  webhookUrl: string;
  events: Events;
}

export interface InitReturns {
  webhookData: AnyObject | AnyObject[];
  events: Events;
}

export interface VerifyWebhookSignatureProps {
  request: {
    headers: object;
    body: string;
  };
  signature: string;
  secret: string | null;
  webhookUrl?: string;
  webhookId?: string;
  webhookIds?: string[];
}

export interface SubscriptionProps {
  webhookId?: string;
  events: Events;
  webhookUrl?: string;
  webhookIds?: string[];
}

export interface SubscribeReturns {
  webhook?: AnyObject;
  webhooks?: AnyObject[];
  events: Events;
}

export interface WebhooksProps {
  webhookId?: string;
  webhookIds?: string[];
}

export interface DeleteWebhookEndpointProps {
  webhookId: string;
}

export interface TestConnection {
  success: boolean;
  message: string;
}

export interface TesterClassInterface {
  /**
   * Tests an account's credentials
   *
   * @returns - A success response or throws an error
   */
  testConnection: () => Promise<TestConnection>;
}

