import { MongoClient, Db } from "mongodb";
import {
  DestinationClassI,
  AnyObject,
  TestConnection,
} from "../../../types/destinationClassDefinition";

class MongoDBDriver implements DestinationClassI {
  MONGODB_URI: string;

  client: MongoClient;

  db: Db;

  dbName: string;

  constructor({ MONGODB_URI }: AnyObject) {
    this.MONGODB_URI = MONGODB_URI;
  }

  async connect(config?: AnyObject) {
    const MONGODB_URI = config ? config.MONGODB_URI : this.MONGODB_URI;

    if (!MONGODB_URI) throw new Error("Invalid MongoDB URI provided.");

    this.client = new MongoClient(MONGODB_URI);

    const db = this.client.db();
    this.dbName = db.databaseName;

    this.db = this.client.db(this.dbName);

    await this.client.connect();

    const databases = await this.client.db().admin().listDatabases();
    const databaseNames = databases.databases.map((database) => database.name);

    if (!databaseNames.includes(this.dbName)) {
      throw new Error(`Database '${this.dbName}' does not exist!`);
    }
  }

  async disconnect() {
    return this.client.close();
  }

  async testConnection(): Promise<TestConnection> {
    await this.connect();

    return {
      success: true,
      message: `Successfully connected to the '${this.dbName}' database!`,
    };
  }

  async insertOne({ collection, document, options }) {
    return this.db?.collection(collection).insertOne(document, options);
  }

  async insertMany({ collection, documents, options }) {
    return this.db?.collection(collection).insertMany(documents, options);
  }

  async updateOne({ collection, filter, update, options }) {
    return this.db?.collection(collection).updateOne(filter, update, options);
  }

  async updateMany({ collection, filter, update, options }) {
    return this.db?.collection(collection).updateMany(filter, update, options);
  }

  async deleteOne({ collection, filter, options }) {
    return this.db?.collection(collection).deleteOne(filter, options);
  }

  async deleteMany({ collection, filter, options }) {
    return this.db?.collection(collection).deleteMany(filter, options);
  }
}

const getProxyDriver = (config: AnyObject) => {
  const driver = new MongoDBDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      const whitelistedMethods = [
        "insertOne",
        "insertMany",
        "updateOne",
        "updateMany",
        "deleteOne",
        "deleteMany",
        "testConnection",
      ];

      if (whitelistedMethods.includes(prop as string)) {
        // Establish and close connection for each method call
        return async (payload) => {
          try {
            // Do not connect and disconnect for testConnection
            if (prop === "testConnection") {
              return await driver.testConnection();
            }

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
