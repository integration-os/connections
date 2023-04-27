import { Knex, knex } from "knex";
import {
  DestinationClassI,
  AnyObject,
  TestConnection,
} from "../../../types/destinationClassDefinition";

class MSSQLDriver implements DestinationClassI {
  MSSQL_HOST: string;

  MSSQL_USERNAME: string;

  MSSQL_PASSWORD: string;

  MSSQL_PORT: number;

  MSSQL_DATABASE: string;

  client: Knex;

  constructor({
    MSSQL_HOST,
    MSSQL_USERNAME,
    MSSQL_PASSWORD,
    MSSQL_PORT,
    MSSQL_DATABASE,
  }: AnyObject) {
    this.MSSQL_HOST = MSSQL_HOST;
    this.MSSQL_USERNAME = MSSQL_USERNAME;
    this.MSSQL_PASSWORD = MSSQL_PASSWORD;
    this.MSSQL_PORT = parseFloat(MSSQL_PORT);
    this.MSSQL_DATABASE = MSSQL_DATABASE;
  }

  async connect(config?: AnyObject) {
    const {
      MSSQL_HOST,
      MSSQL_USERNAME,
      MSSQL_PASSWORD,
      MSSQL_PORT,
      MSSQL_DATABASE,
    } = config || this;

    this.client = knex({
      client: "mssql",
      connection: {
        host: MSSQL_HOST,
        user: MSSQL_USERNAME,
        password: MSSQL_PASSWORD,
        port: MSSQL_PORT,
        database: MSSQL_DATABASE,
        options: {
          encrypt: true,
        },
      },
    });

    try {
      await this.client.raw("SELECT 1");
    } catch (error) {
      throw new Error(`Error connecting to Microsoft SQL Server: ${error.message}`);
    }
  }

  async disconnect() {
    return this.client.destroy();
  }

  async testConnection(): Promise<TestConnection> {
    await this.connect();

    return {
      success: true,
      message: `Successfully connected to the '${this.MSSQL_DATABASE}' database!`,
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
  const driver = new MSSQLDriver(config);

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
