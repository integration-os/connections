import * as amqp from 'amqplib';
import { TestConnection } from "../../../types/sourceClassDefinition";

export default class RabbitMQ {
  RABBITMQ_CONNECTION_URI: string;

  RABBITMQ_QUEUES: string;

  constructor({
    RABBITMQ_CONNECTION_URI,
    RABBITMQ_QUEUES,
  }: {
    RABBITMQ_CONNECTION_URI: string;
    RABBITMQ_QUEUES: string;
  }) {
    this.RABBITMQ_CONNECTION_URI = RABBITMQ_CONNECTION_URI;
    this.RABBITMQ_QUEUES = RABBITMQ_QUEUES;
  }

  async init({ webhookUrl, events }) {
    return {
      webhookData: {},
      events,
    };
  }

  async verifyWebhookSignature({ request, signature, secret }) {
    // Validation falls on the user to implement
    return true;
  }

  async subscribe({ webhookId, events }) {
    return {
      webhook: {},
      events: [],
    };
  }

  async unsubscribe({ webhookId, events }) {
    return {
      events: [],
      webhook: {},
    };
  }

  async getWebhooks() {
    return [];
  }

  async getSubscribedEvents({ webhookId }) {
    return [];
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    let connection;

    try {
      connection = await amqp.connect(this.RABBITMQ_CONNECTION_URI);

      const channel = await connection.createChannel();

      const queueNames = this.RABBITMQ_QUEUES.split(",").map((queue) => queue.trim());

      for (const queueName of queueNames) {
        await channel.checkQueue(queueName);
      }

      await connection.close();

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (error) {
      if (connection) await connection.close();

      throw new Error(
        `Unable to connect to RabbitMQ: ${error.message}`,
      );
    }
  }
}
