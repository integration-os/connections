import { Knex, knex } from "knex";
import {
  DestinationClassI,
  AnyObject,
  TestConnection,
} from "../../../types/destinationClassDefinition";

class PostgreSQLDriver implements DestinationClassI {
  POSTGRESQL_HOST: string;

  POSTGRESQL_USERNAME: string;

  POSTGRESQL_PASSWORD: string;

  POSTGRESQL_PORT: number;

  POSTGRESQL_DATABASE: string;

  client: Knex;

  constructor({
    POSTGRESQL_HOST,
    POSTGRESQL_USERNAME,
    POSTGRESQL_PASSWORD,
    POSTGRESQL_PORT,
    POSTGRESQL_DATABASE,
  }: AnyObject) {
    this.POSTGRESQL_HOST = POSTGRESQL_HOST;
    this.POSTGRESQL_USERNAME = POSTGRESQL_USERNAME;
    this.POSTGRESQL_PASSWORD = POSTGRESQL_PASSWORD;
    this.POSTGRESQL_PORT = parseFloat(POSTGRESQL_PORT);
    this.POSTGRESQL_DATABASE = POSTGRESQL_DATABASE;
  }

  async connect(config?: AnyObject) {
    const {
      POSTGRESQL_HOST,
      POSTGRESQL_USERNAME,
      POSTGRESQL_PASSWORD,
      POSTGRESQL_PORT,
      POSTGRESQL_DATABASE,
    } = config || this;

    this.client = knex({
      client: "pg",
      connection: {
        host: POSTGRESQL_HOST,
        user: POSTGRESQL_USERNAME,
        password: POSTGRESQL_PASSWORD,
        port: POSTGRESQL_PORT,
        database: POSTGRESQL_DATABASE,
      },
    });

    try {
      await this.client.raw("SELECT 1");
    } catch (error) {
      throw new Error(`Error connecting to PostgreSQL: ${error.message}`);
    }
  }

  async disconnect() {
    return this.client.destroy();
  }

  async testConnection(): Promise<TestConnection> {
    await this.connect();

    return {
      success: true,
      message: `Successfully connected to the '${this.POSTGRESQL_DATABASE}' database!`,
    };
  }

  async insert({
    tableName,
    data,
    returning,
    options,
  }: {
    tableName: string;
    data: AnyObject;
    returning?: string[];
    options?: AnyObject;
  }) {
    return this.client(tableName).insert(data, returning, options);
  }

  async update({
    tableName,
    query,
    data,
    returning,
    options,
  }: {
    tableName: string;
    query: AnyObject;
    data: AnyObject;
    returning: string[];
    options: AnyObject;
  }) {
    return this.client(tableName).where(query).update(data, returning, options);
  }

  async delete({ tableName, query }: { tableName: string; query: AnyObject }) {
    return this.client(tableName).where(query).del();
  }

  async executeRawQuery({
    statement,
    maxLimit = 100,
  }: {
    statement: string;
    maxLimit: number;
  }) {
    const limitedStatement = handleLimit(statement, maxLimit);

    return this.client.raw(limitedStatement);
  }
}

const handleLimit = (query: string, maxLimit: number) => {
  if (maxLimit > 200) {
    throw new Error(
      "The optimized value for maxLimit is less than or equal to 200",
    );
  }

  const splitQuery = query.split(";");

  splitQuery.forEach((q, i) => {
    if (q.trim().toLowerCase().substring(0, "select".length) === "select") {
      splitQuery[i] = setHardLimit(q.trim(), maxLimit);
    }
  });

  return splitQuery.join("; ");
};

const setHardLimit = (query: string, maxLimit: number) => {
  // if (query.charAt(query.length - 1) === ";") {
  //   query = query.substring(0, query.length - 1);
  // }
  const limitedQuery = query.charAt(query.length - 1) === ";" ? query.substring(query.length - 1) : query;

  const tokenizedQuery = limitedQuery.split(" ");
  const foundIndex = Math.max(
    tokenizedQuery.lastIndexOf("limit"),
    tokenizedQuery.lastIndexOf("LIMIT"),
  );
  if (foundIndex > 0) {
    const limit = tokenizedQuery[foundIndex + 1];
    if (Number.parseInt(limit, 10) > maxLimit) {
      // Handle parsing with parenthesis or semicolons
      tokenizedQuery[foundIndex + 1] =
        maxLimit +
        limit.toString().substring(Number.parseInt(limit, 10).toString().length);
    }
  } else {
    tokenizedQuery.push("LIMIT");
    tokenizedQuery.push(maxLimit.toString());
  }

  return tokenizedQuery.join(" ");
};

const getProxyDriver = (config: AnyObject) => {
  const driver = new PostgreSQLDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      const whitelistedMethods = [
        "insert",
        "update",
        "delete",
        "executeRawQuery",
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
