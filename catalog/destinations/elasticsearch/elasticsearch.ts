import { Client, ClientOptions } from "@elastic/elasticsearch";
import {
  DestinationClassI,
  AnyObject,
  TestConnection,
} from "../../../types/destinationClassDefinition";

class ElasticSearchDriver implements DestinationClassI {
  ELASTICSEARCH_URL: string;

  ELASTICSEARCH_API_KEY: string;

  ELASTICSEARCH_BASIC_USER: string;

  ELASTICSEARCH_BASIC_PASSWORD: string;

  ELASTICSEARCH_TLS_CA: string;

  ELASTICSEARCH_CLOUD_ID: string;

  client: Client;

  constructor({ ELASTICSEARCH_URL, ELASTICSEARCH_API_KEY, ELASTICSEARCH_BASIC_USER, ELASTICSEARCH_BASIC_PASSWORD, ELASTICSEARCH_TLS_CA, ELASTICSEARCH_CLOUD_ID }: AnyObject) {
    this.ELASTICSEARCH_URL = ELASTICSEARCH_URL;
    this.ELASTICSEARCH_API_KEY = ELASTICSEARCH_API_KEY;
    this.ELASTICSEARCH_BASIC_USER = ELASTICSEARCH_BASIC_USER;
    this.ELASTICSEARCH_BASIC_PASSWORD = ELASTICSEARCH_BASIC_PASSWORD;
    this.ELASTICSEARCH_TLS_CA = ELASTICSEARCH_TLS_CA;
    this.ELASTICSEARCH_CLOUD_ID = ELASTICSEARCH_CLOUD_ID;
  }

  async connect(config: AnyObject) {
    const ELASTICSEARCH_URL = config ? config.ELASTICSEARCH_URL : this.ELASTICSEARCH_URL;
    const ELASTICSEARCH_API_KEY = config ? config.ELASTICSEARCH_API_KEY : this.ELASTICSEARCH_API_KEY;
    const ELASTICSEARCH_BASIC_USER = config ? config.ELASTICSEARCH_BASIC_USER : this.ELASTICSEARCH_BASIC_USER;
    const ELASTICSEARCH_BASIC_PASSWORD = config ? config.ELASTICSEARCH_BASIC_PASSWORD : this.ELASTICSEARCH_BASIC_PASSWORD;
    const ELASTICSEARCH_TLS_CA = config ? config.ELASTICSEARCH_TLS_CA : this.ELASTICSEARCH_TLS_CA;
    const ELASTICSEARCH_CLOUD_ID = config ? config.ELASTICSEARCH_CLOUD_ID : this.ELASTICSEARCH_CLOUD_ID;

    const clientConfig: ClientOptions = {
      node: ELASTICSEARCH_URL,
    };

    if (ELASTICSEARCH_API_KEY) {
      clientConfig.auth = {
        apiKey: ELASTICSEARCH_API_KEY,
      };
    } else if (ELASTICSEARCH_BASIC_USER || ELASTICSEARCH_BASIC_PASSWORD) {
      clientConfig.auth = {
        username: ELASTICSEARCH_BASIC_USER,
        password: ELASTICSEARCH_BASIC_PASSWORD,
      };
    }

    if (ELASTICSEARCH_TLS_CA) {
      clientConfig.tls = {
        ca: ELASTICSEARCH_TLS_CA,
      };
    }

    if (ELASTICSEARCH_CLOUD_ID) {
      clientConfig.cloud = {
        id: ELASTICSEARCH_CLOUD_ID,
      };
    }

    this.client = new Client(clientConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  async disconnect() {
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    await this.client.cat.indices({ format: "json" });

    return {
      success: true,
      message: "Successfully connected to the elasticsearch instance!",
    };
  }

  async index({ index, document, ...rest }) {
    return this.client.index({
      index,
      document,
      ...rest,
    });
  }

  async delete({ index, id, ...rest }) {
    return this.client.delete({
      index,
      id,
      ...rest,
    });
  }

  async update({ index, id, doc, ...rest }) {
    return this.client.update({
      index,
      id,
      doc,
      ...rest,
    });
  }

  async bulk({ operations, ...rest }) {
    return this.client.bulk({
      operations,
      ...rest,
    });
  }
}

const getProxyDriver = (config: AnyObject) => {
  const driver = new ElasticSearchDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      const whitelistedMethods = [
        "index",
        "delete",
        "update",
        "bulk",
        "testConnection",
      ];

      if (whitelistedMethods.includes(prop as string)) {
        // Establish and close connection for each method call
        return async (payload) => {
          try {
            await driver.connect(config);

            const result = await driver[prop](payload);

            await driver.disconnect();

            return result;
          } catch (error) {
            console.log("Error occured ===> ", error);
            throw error;
          }
        };
      }

      throw new Error(`Method ${prop as string} not found`);
    },
  });
};

export default getProxyDriver;
