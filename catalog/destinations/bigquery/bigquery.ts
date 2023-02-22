import dayjs, { Dayjs } from "dayjs";
import { BigQuery, TableSchema } from "@google-cloud/bigquery";
import bigquery from "@google-cloud/bigquery/build/src/types";

import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { BigQuerySchemaType, IBigQueryDelete, IBigQueryInsert, IBigQueryUpdate } from "./lib/types";

import ITableFieldSchema = bigquery.ITableFieldSchema;

export class BigQueryDriver implements DestinationClassI {
  client: BigQuery | null = null;

  GCP_PROJECT_ID: string;

  GOOGLE_SERVICE_ACCOUNT_KEY: string;

  constructor({ GOOGLE_SERVICE_ACCOUNT_KEY, GCP_PROJECT_ID }: AnyObject) {
    this.GOOGLE_SERVICE_ACCOUNT_KEY = GOOGLE_SERVICE_ACCOUNT_KEY;
    this.GCP_PROJECT_ID = GCP_PROJECT_ID;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    const { GOOGLE_SERVICE_ACCOUNT_KEY, GCP_PROJECT_ID } = config || this;

    console.log("connect", {
      GOOGLE_SERVICE_ACCOUNT_KEY,
      GCP_PROJECT_ID,
    });

    // reassign GCP_PROJECT_ID
    this.GCP_PROJECT_ID = GCP_PROJECT_ID;

    const saKey = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);

    this.client = new BigQuery({
      projectId: GCP_PROJECT_ID,
      credentials: saKey,
    });
  }

  async disconnect(): Promise<void | Truthy> {
    this.client = null;
  }

  async testConnection(): Promise<TestConnection> {
    if (!this.client) {
      await this.connect();
    }

    // A sample query
    const query = `SELECT name
      FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
      WHERE state = 'TX'
      LIMIT 1`;

    const response = await this.client.query(query);

    await this.disconnect();

    if (!response) {
      return {
        success: false,
        message: "Could not establish connection to BigQuery",
      };
    }

    return {
      success: true,
      message: "Connection established successfully",
    };
  }

  /**
   * Insert a chunk of data into BigQuery
   * @param dataset name of the dataset
   * @param table name of the table to insert into
   * @param data source data
   * @param options insertion options
   */
  async insertData({ dataset, table, data, options }: IBigQueryInsert) {
    const bqTable = this.client.dataset(dataset).table(table);

    // check if the table exists
    try {
      await bqTable.get();
    } catch (err) {
      if (err.message.match(/Not found: Table/)) {
        throw new Error(`BigQuery - table not found: \`${this.GCP_PROJECT_ID}.${dataset}.${table}\``);
      }

      throw new Error(`BigQuery - ${err.message}`);
    }

    return bqTable.insert(data, options).catch((err) => {
      // detect whether the error is from schema mismatch or something else

      const isSchemaMismatch = (err.errors as any).find(
        (error) => error.errors.find(
          (e) => e.message.match(/no such field/),
        ),
      );

      if (isSchemaMismatch) {
        throw new Error(`BigQuery - Schema mismatch: ${isSchemaMismatch.errors[0].message}`);
      }

      throw err;
    });
  }

  /**
   * Updates row(s) of data that match certain criteria from a BigQuery table
   * @param dataset name of the dataset
   * @param table name of the table to update rows from
   * @param set set of key/value pairs to update
   * @param filters criteria to match for, written as a SQL `WHERE` clause
   */
  async updateData({ dataset, table, filters, set }: IBigQueryUpdate) {
    if (!filters || !filters.length) {
      throw new Error("BigQuery UPDATE must have a WHERE clause");
    }

    // extract table schema
    const bqTable = this.client.dataset(dataset).table(table);

    const metadata = await bqTable.getMetadata();
    const { schema } = metadata[0];

    // compose SQL query
    const updateQuery = `UPDATE \`${this.GCP_PROJECT_ID}.${dataset}.${table}\`
      SET ${BigQueryDriver.extractChangeset(set, schema)}
      WHERE ${filters}
    `;
    // execute query
    return bqTable.query(updateQuery);
  }

  /**
   * Deletes row(s) of data that match certain criteria from a BigQuery table
   * @param dataset name of the dataset
   * @param table name of the table to delete rows from
   * @param filters criteria to match for, written as a SQL `WHERE` clause
   */
  async deleteData({ dataset, table, filters }: IBigQueryDelete) {
    if (!filters || !filters.length) {
      throw new Error("BigQuery DELETE must have a WHERE clause");
    }

    const deleteQuery = `DELETE FROM \`${this.GCP_PROJECT_ID}.${dataset}.${table}\`
        WHERE ${filters}
    `;

    return this.client.dataset(dataset).table(table).query(deleteQuery);
  }

  /**
   * Parses the passed value into a BigQuery SQL-DML compliant query string
   * @param key column name
   * @param value value to parse
   * @param fieldSchema BigQuery field schema
   * @private
   */
  private static parseValue(key: string, value: String | AnyObject, fieldSchema: ITableFieldSchema): string {
    let record: string;
    let values: string[];

    let date: Dayjs | null = null;

    // eslint-disable-next-line default-case
    switch (fieldSchema.type as BigQuerySchemaType) {
      case "INTEGER":
      case "FLOAT":
      case "NUMERIC":
      case "BIGNUMERIC":
        if (Number.isNaN(parseFloat(value as string))) {
          throw new Error(`Schema mismatch: "${value}" is not a valid value for field "${fieldSchema.name}" of type "${fieldSchema.type}"`);
        }
        return `${value}`;

      case "BOOLEAN":
        if (String(value) !== "true" && String(value) !== "false") {
          throw new Error(`Schema mismatch: "${value}" is not a valid value for field "${fieldSchema.name}" of type "${fieldSchema.type}"`);
        }

        // fallback
        return `${value}`;

      case "STRING":
        return `"${value}"`;

      case "DATE":
        date = dayjs(value as string);

        if (date.isValid()) {
          return `"${date.format("YYYY-MM-DD")}"`;
        }

        return `"${value}"`;
      case "TIME":
        date = dayjs(value as string);

        if (date.isValid()) {
          return `"${date.format("HH:mm:ss")}"`;
        }

        return `"${value}"`;
      case "DATETIME":
        date = dayjs(value as string);

        if (date.isValid()) {
          return `"${date.format("YYYY-MM-DD HH:mm:ss")}"`;
        }

        return `"${value}"`;

      case "TIMESTAMP":
        date = dayjs(value as string);

        if (date.isValid()) {
          return `timestamp("${date.format("YYYY-MM-DD HH:mm:ss")}")`;
        }

        return `timestamp("${value}")`;

      case "GEOGRAPHY": // value must conform to BigQuery Geography type. See https://cloud.google.com/bigquery/docs/geospatial-data
        return `ST_GEOGFROMTEXT("${value}")`;

      case "JSON":
        return `JSON '${JSON.stringify(value)}'`;

      case "BYTES":
        return `CAST("${value}" as BYTES)`;

      case "RECORD":
        record = "STRUCT(";

        values = fieldSchema.fields.map((field) => {
          const v = value[field.name];

          if (v) {
            return BigQueryDriver.parseValue(field.name, v, field);
          }

          return `${key}.${field.name}`;
        });

        record += `${values.join(",")})`;
        return record;
    }
  }

  /**
   * Extracts BigQuery SQL-DML compliant string from values that need to be updated.
   * @param set changeset
   * @param schema BigQuery table schema
   * @private
   */
  private static extractChangeset(set: string[] | AnyObject, schema: TableSchema): string {
    if (Array.isArray(set)) {
      return set.join(",");
    }

    const changeset = Object.entries(set).map(([key, value]) => {
      let query = `${key}=`;
      const keySchema: ITableFieldSchema | undefined = schema.fields.find((field) => field.name === key);

      if (!keySchema) {
        throw new Error(`Schema mismatch: ${key} not found`);
      }

      query += BigQueryDriver.parseValue(key, value, keySchema);

      return query;
    });

    return changeset.join(",");
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new BigQueryDriver(config);
  console.log("driver config", config);

  return new Proxy(driver, {
    get: (target, prop) => {
      // return the client
      if (prop === "client") {
        return driver.client;
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

            console.log({
              prop,
              payload,
              config,
            });

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
