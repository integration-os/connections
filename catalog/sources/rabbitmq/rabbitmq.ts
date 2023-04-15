import amqplib from "amqplib";

import axios from "axios";
import {
  AnyObject,
  DeleteWebhookEndpointProps, Events, InitProps, InitReturns,
  IntegrationClassI, SubscribeReturns, SubscriptionProps, TestConnection,
  Truthy, VerifyWebhookSignatureProps,
  WebhooksProps,
} from "../../../types/sourceClassDefinition";

export default class RabbitMQIntegration implements IntegrationClassI {
  id: string;

  name: string;

  RABBITMQ_URL: string;

  RABBITMQ_PORT: number;

  RABBITMQ_QUEUE: string;

  RABBITMQ_USERNAME: string | undefined;

  RABBITMQ_PASSWORD: string | undefined;

  private conn: amqplib.Connection = null;

  private channel: amqplib.Channel = null;

  private consumer: amqplib.Replies.Consume = null;

  private isConsuming: boolean = false;

  constructor({
    RABBITMQ_URL,
    RABBITMQ_PORT,
    RABBITMQ_QUEUE,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
  }: {RABBITMQ_URL: string,
    RABBITMQ_QUEUE: string,
    RABBITMQ_PORT?: number,
    RABBITMQ_USERNAME?: string,
    RABBITMQ_PASSWORD?: string
  }) {
    this.RABBITMQ_URL = RABBITMQ_URL;
    this.RABBITMQ_QUEUE = RABBITMQ_QUEUE;
    this.RABBITMQ_PORT = Number(RABBITMQ_PORT) || 5672;
    this.RABBITMQ_USERNAME = RABBITMQ_USERNAME;
    this.RABBITMQ_PASSWORD = RABBITMQ_PASSWORD;
  }

  async init({ webhookUrl }: InitProps): Promise<InitReturns> {
    // drop old connection
    if (this.conn) {
      await this.conn.close();
    }

    // create new connection
    const conn = await amqplib.connect({
      protocol: "amqp",
      hostname: this.RABBITMQ_URL,
      port: this.RABBITMQ_PORT,
      username: this.RABBITMQ_USERNAME || undefined,
      password: this.RABBITMQ_PASSWORD || undefined,
    });

    // drop old channel
    if (this.channel) {
      await this.channel.cancel(this.consumer.consumerTag);
      await this.channel.close();
    }

    // create new channel
    this.channel = await conn.createChannel();

    // check if queue exists
    await this.channel.checkQueue(this.RABBITMQ_QUEUE);

    // register a consumer
    this.consumer = await this.channel.consume(this.RABBITMQ_QUEUE, async (msg) => {
      const data = {
        body: RabbitMQIntegration.jsonify(msg.content.toString()),
        properties: msg.properties,
        fields: msg.fields,
      };

      // forward message to webhookUrl
      await axios.post(webhookUrl, data);

      this.channel.ack(msg);
    });

    // set consuming flag
    this.isConsuming = true;

    // return data
    return {
      webhookData: this.consumer,
      events: ["consumer"],
    };
  }

  async verifyWebhookSignature(_props: VerifyWebhookSignatureProps): Promise<Truthy> {
    return true;
  }

  async subscribe({ webhookUrl }: SubscriptionProps): Promise<SubscribeReturns> {
    const response = await this.init({ webhookUrl, events: ["consumer"] });

    return {
      webhook: response.webhookData,
      events: response.events,
    };
  }

  async unsubscribe({ events }: SubscriptionProps): Promise<{ events: Events; webhook?: any; webhooks?: any }> {
    if (events.includes("consumer")) {
      await this.channel.cancel(this.consumer.consumerTag);
      this.isConsuming = false;

      return {
        webhook: this.consumer,
        events: null,
      };
    }
  }

  async getWebhooks(_props: WebhooksProps | undefined): Promise<AnyObject | AnyObject[]> {
    return this.consumer;
  }

  async getSubscribedEvents(_props: WebhooksProps): Promise<Events> {
    return this.isConsuming ? ["consumer"] : [];
  }

  async deleteWebhookEndpoint(_props: DeleteWebhookEndpointProps): Promise<Truthy> {
    if (this.conn) {
      await this.conn.close();
      this.conn = null;
    }

    if (this.channel) {
      await this.channel.cancel(this.consumer.consumerTag);
      await this.channel.close();
      this.channel = null;
    }

    if (this.consumer) {
      this.consumer = null;
    }

    this.isConsuming = false;
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    return amqplib.connect({
      protocol: "amqp",
      hostname: this.RABBITMQ_URL,
      port: this.RABBITMQ_PORT,
      username: this.RABBITMQ_USERNAME || undefined,
      password: this.RABBITMQ_PASSWORD || undefined,
    }).then(() => {
      return {
        success: true,
        message: "Connection tested successfully!",
      };
    }).catch((err) => {
      return {
        success: false,
        message: `Could not establish connection with RabbitMQ: ${err.message}`,
      };
    });
  }

  /**
   * Try to parse data as JSON, if it fails return the original data
   * @param data - data to parse
   * @private
   */
  private static jsonify(data: string): AnyObject | string {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
}
