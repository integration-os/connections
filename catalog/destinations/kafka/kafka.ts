import { Kafka, KafkaConfig, Producer } from "kafkajs";

import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { IKafkaPushData } from "./lib/types";

export class KafkaDriver implements DestinationClassI {
  public client: Kafka = null;

  public producer: Producer = null;

  public readonly KAFKA_BROKER_URLS: string;

  public readonly KAFKA_USERNAME: string;

  public readonly KAFKA_PASSWORD: string;

  constructor({ KAFKA_BROKER_URLS, KAFKA_USERNAME, KAFKA_PASSWORD }: AnyObject) {
    this.KAFKA_BROKER_URLS = KAFKA_BROKER_URLS;
    this.KAFKA_USERNAME = KAFKA_USERNAME;
    this.KAFKA_PASSWORD = KAFKA_PASSWORD;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    const { KAFKA_BROKER_URLS, KAFKA_USERNAME, KAFKA_PASSWORD } = config || this;

    this.client = new Kafka({
      clientId: "buildable",
      brokers: KAFKA_BROKER_URLS.split(",").map((url) => url.trim()),
      ssl: true,
      sasl: {
        mechanism: "plain",
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD,
      },
      logLevel: 1,
      connectionTimeout: 5000,
    });

    this.producer = this.client.producer();
    await this.producer.connect();
  }

  async disconnect(): Promise<void | Truthy> {
    if (this.producer) {
      await this.producer.disconnect();
      this.producer = null;
    }

    if (this.client) {
      this.client = null;
    }
  }

  async testConnection(): Promise<TestConnection> {
    // If the client is not yet initialized, initialize it
    if (!this.client) {
      this.client = new Kafka({
        clientId: "buildable",
        brokers: this.KAFKA_BROKER_URLS.split(",").map((url) => url.trim()),
        ssl: true,
        sasl: {
          mechanism: "plain",
          username: this.KAFKA_USERNAME,
          password: this.KAFKA_PASSWORD,
        },
        logLevel: 1,
        connectionTimeout: 5000,
      });
    }

    // Test the connection
    try {
      const admin = this.client.admin();
      await admin.connect();
      await admin.disconnect();

      return {
        success: true,
        message: "Connection established successfully",
      };
    } catch (e) {
      return {
        success: false,
        message: `Kafka connection failed: ${e.message}`,
      };
    }
  }

  /**
   * Push data to Kafka
   * @param topic - Kafka topic
   * @param data - Data to push to Kafka
   * @param headers - Headers to send with the message
   * @param partition - Partition to send the message to
   * @param key - Key to send with the message
   * @param timestamp - Timestamp in UTC format
   */
  async pushData({ topic, data, headers, partition, key, timestamp }: IKafkaPushData) {
    return this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(data), headers, partition, key, timestamp }],
    });
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new KafkaDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      // return the client
      if (prop === "client") {
        return driver.client;
      }

      // return the producer
      if (prop === "producer") {
        return driver.producer;
      }

      if (typeof driver[prop] === "function") {
        if (prop === "testConnection") {
          return async () => driver.testConnection();
        }

        // Force the proxy to return a Promise that only resolves once the connection has been established
        if (prop === "connect") {
          return async () => {
            await driver.connect(config);
          };
        }

        // Force the proxy to return a Promise that only resolves once the connection has been dropped
        if (prop === "disconnect") {
          return async () => {
            await driver.disconnect();
          };
        }

        return async (payload) => {
          try {
            await driver.connect(config);

            const result = await target[prop](payload);

            await driver.disconnect();

            return result;
          } catch (err) {
            console.log("Error occurred ===> ", err);
            throw err;
          }
        };
      }

      throw new Error(`Method ${prop as string}() not found`);
    },
  });
}
