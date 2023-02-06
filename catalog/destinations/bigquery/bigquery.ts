import { BigQuery } from "@google-cloud/bigquery";
import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";
import { IBigQueryInsert } from "./lib/types";

class BigQueryDriver implements DestinationClassI {
  private readonly GOOGLE_SERVICE_ACCOUNT_KEY: string;

  private client: BigQuery | null = null;

  GCP_PROJECT_ID: string;

  constructor({ GOOGLE_SERVICE_ACCOUNT_KEY, PROJECT_ID }: AnyObject) {
    this.GOOGLE_SERVICE_ACCOUNT_KEY = GOOGLE_SERVICE_ACCOUNT_KEY;
    this.GCP_PROJECT_ID = PROJECT_ID;
  }

  async connect(config?: AnyObject): Promise<void | Truthy> {
    const saKey = config && config.GOOGLE_SERVICE_ACCOUNT_KEY ?
      JSON.parse(config.GOOGLE_SERVICE_ACCOUNT_KEY) :
      JSON.parse(this.GOOGLE_SERVICE_ACCOUNT_KEY);

    this.client = new BigQuery({
      projectId: this.GCP_PROJECT_ID,
      credentials: saKey,
    });
  }

  async disconnect(): Promise<void | Truthy> {
    this.client = null;
  }

  async testConnection(): Promise<TestConnection> {
    // A sample query
    const query = `SELECT name
      FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
      WHERE state = 'TX'
      LIMIT 100`;

    const response = await this.client!.query(query);

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

  async insertData({ dataset, table, data, options }: IBigQueryInsert) {
    try {
      await this.client?.dataset(dataset).table(table).get();
    } catch (err) {
      // TODO: table not found, store to the letters archive
      return;
    }

    try {
      // NOTE: maybe send data to BigQuery by chunks?
      await this.client?.dataset(dataset).table(table).insert(data, options);
    } catch (err) {
      // TODO data does not match the schema, store to the letters archive

    }
  }

  // async insertDataFromUrl({ dataset, table, urls, format, metadata }: IBigQueryUrlInsert) {
  //   for (const url of urls) {
  //     const response = await axios.get(url, { responseType: "stream" });
  //
  //     await this.client?.dataset(dataset).table(table).load(file, { ...metadata, format });
  //   }
  // }
}

const getProxyDriver = (config: AnyObject) => {
  const driver = new BigQueryDriver(config);

  return new Proxy(driver, {
    get: (target, props) => {
      // TODO: implement this
    },
  });
};

export default getProxyDriver;
