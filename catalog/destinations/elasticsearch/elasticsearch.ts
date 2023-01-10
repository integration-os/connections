import {
  DestinationClassI,
  AnyObject,
  TestConnection,
} from "../../../types/destinationClassDefinition";
import { Client } from "@elastic/elasticsearch";

class ElasticSearchDriver implements DestinationClassI {
  ELASTIC_SEARCH_URI: string;
  ELASTIC_SEARCH_API_KEY: string;
  ELASTIC_SEARCH_BASIC_USER: string;
  ELASTIC_SEARCH_BASIC_PASSWORD: string;
  ELASTIC_SEARCH_TLS_CA: string;
  client: Client;

  constructor({ ELASTIC_SEARCH_URI, ELASTIC_SEARCH_API_KEY, ELASTIC_SEARCH_BASIC_USER, ELASTIC_SEARCH_BASIC_PASSWORD, ELASTIC_SEARCH_TLS_CA }: AnyObject) {
    this.ELASTIC_SEARCH_URI = ELASTIC_SEARCH_URI;
    this.ELASTIC_SEARCH_API_KEY = ELASTIC_SEARCH_API_KEY;
    this.ELASTIC_SEARCH_BASIC_USER = ELASTIC_SEARCH_BASIC_USER;
    this.ELASTIC_SEARCH_BASIC_PASSWORD = ELASTIC_SEARCH_BASIC_PASSWORD;
    this.ELASTIC_SEARCH_TLS_CA = ELASTIC_SEARCH_TLS_CA;
  }

  async connect(config?: AnyObject) {
    const ELASTIC_SEARCH_URI = config ? config.ELASTIC_SEARCH_URI : this.ELASTIC_SEARCH_URI;
    const ELASTIC_SEARCH_API_KEY = config ? config.ELASTIC_SEARCH_API_KEY : this.ELASTIC_SEARCH_API_KEY;
    const ELASTIC_SEARCH_BASIC_USER = config ? config.ELASTIC_SEARCH_BASIC_USER : this.ELASTIC_SEARCH_BASIC_USER;
    const ELASTIC_SEARCH_BASIC_PASSWORD = config ? config.ELASTIC_SEARCH_BASIC_PASSWORD : this.ELASTIC_SEARCH_BASIC_PASSWORD;
    const ELASTIC_SEARCH_TLS_CA = config ? config.ELASTIC_SEARCH_TLS_CA : this.ELASTIC_SEARCH_TLS_CA;

    let auth: any = {};
    let tls: any;

    if(ELASTIC_SEARCH_API_KEY) {
      auth = {
        apiKey: ELASTIC_SEARCH_API_KEY,
      }
    } else if(ELASTIC_SEARCH_BASIC_USER || ELASTIC_SEARCH_BASIC_PASSWORD) {
      auth = {
        username: ELASTIC_SEARCH_BASIC_USER,
        password: ELASTIC_SEARCH_BASIC_PASSWORD,
      }
    }

    if(ELASTIC_SEARCH_TLS_CA) {
      tls = {
        ca: ELASTIC_SEARCH_TLS_CA,
      }
    }

    this.client = new Client({
      node: ELASTIC_SEARCH_URI,
      auth,
      ...(tls ? { tls } : {})
    });
  }

  async disconnect() {
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    await this.client.cat.indices({ format: "json" })

    return {
      success: true,
      message: `Successfully connected to the elasticsearch instance!`,
    };
  }

  async index({ index, document, ...rest }) {
    return this.client.index({
      index,
      document,
      ...rest
    });
  }

  async delete({ index, id, ...rest }) {
    return this.client.delete({
      index,
      id,
      ...rest
    });
  }

  async update({ index, id, doc, ...rest }) {
    return this.client.update({
      index,
      id,
      doc,
      ...rest
    });
  }

  async bulk({ operations, ...rest }) {
    return this.client.bulk({
      operations,
      ...rest
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
