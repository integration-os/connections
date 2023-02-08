import { BigQuery } from "@google-cloud/bigquery";
import crypto from "crypto";
import getProxyDriver, { BigQueryDriver } from "../bigquery";

jest.mock("@google-cloud/bigquery");

describe("Test: BigQuery Destination", () => {
  let driver: BigQueryDriver | null = null;

  describe("connect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should connect to BigQuery", async () => {
      await driver.connect();
      const result = await driver.testConnection();

      expect(result.success).toBeTruthy();
    });
  });

  describe("disconnect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
        },
      );

      driver.connect();
    });

    afterEach(() => {
      driver = null;
    });

    it("should disconnect from BigQuery", async () => {
      await driver.disconnect();
      await expect(driver.testConnection()).rejects.toThrow();
    });
  });

  describe("insertData", async () => {
    const client = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    });

    const datasetName = `buildable-test-dataset-${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;
    const tableName = `buildable-test-table-${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;

    beforeAll(async () => {
      // create a temporary BigQuery dataset
      const dataset = client.dataset(datasetName);
      await dataset.create();

      // create a temporary table within the dataset
      const table = dataset.table(tableName);
      await table.create({ schema: [
        { name: "id", type: "INTEGER", mode: "REQUIRED" },
        { name: "name", type: "STRING", mode: "REQUIRED" },
      ] });
    });

    afterAll(async () => {
      const dataset = client.dataset(datasetName);

      // get a list of tables in the dataset
      const [tables] = await dataset.getTables();

      // delete each table in the dataset
      for (const table of tables) {
        await table.delete();
      }

      // delete the dataset
      await dataset.delete();
    });

    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should raise an error if the driver is not connected to BigQuery", async () => {
      await expect(driver.insertData({
        dataset: datasetName,
        table: tableName,
        data: [{ id: 1, name: "Jon Snow" }],
        options: {},
      })).rejects.toThrow(/Connection to BigQuery not established/);
    });

    it("should raise an error if the table does not exist", async () => {
      // TODO
    });

    it("should raise an error if the schema is being altered", async () => {
      // TODO
    });

    it("should insert data into BigQuery table", async () => {
      const response = await driver.insertData({
        dataset: datasetName,
        table: tableName,
        data: [{ id: 1, name: "Jon Snow" }],
        options: {},
      });

      expect(response.length).toEqual(1);
    });
  });

  describe("updateData", () => {
    const client = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    });

    const datasetName = `buildable-test-dataset-${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;
    const tableName = `buildable-test-table-${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;

    beforeAll(async () => {
      // create a temporary BigQuery dataset
      const dataset = client.dataset(datasetName);
      await dataset.create();

      // create a temporary table within the dataset
      const table = dataset.table(tableName);
      await table.create({ schema: [
        { name: "id", type: "INTEGER", mode: "REQUIRED" },
        { name: "name", type: "STRING", mode: "REQUIRED" },
        { name: "address",
          type: "RECORD",
          mode: "NULLABLE",
          fields: [
            {
              name: "street1",
              type: "STRING",
            },
            {
              name: "street2",
              type: "STRING",
            },
            {
              name: "city",
              type: "STRING",
            },
            {
              name: "state",
              type: "STRING",
            },
          ] },
      ] });

      // insert some mock data
      await table.insert([
        {
          id: 1,
          name: "Eddard Stark",
          address: {
            street1: "Winterfell",
            street2: "Castle Black",
            city: "The North",
            state: "Westeros",
          },
        },
        {
          id: 2,
          name: "Cersei Lannister",
          address: {
            street1: "Casterly Rock",
            street2: "King's Landing",
            city: "The Crownlands",
            state: "Westeros",
          },
        },
        {
          id: 3,
          name: "Daenerys Targaryen",
          address: {
            street1: "Dragonstone",
            street2: "Meereen",
            city: "Essos",
            state: "Westeros",
          },
        },
        {
          id: 4,
          name: "Jon Snow",
          address: {
            street1: "Winterfell",
            street2: "Castle Black",
            city: "The North",
            state: "Westeros",
          },
        },
        {
          id: 5,
          name: "Tyrion Lannister",
          address: {
            street1: "Casterly Rock",
            street2: "King's Landing",
            city: "The Crownlands",
            state: "Westeros",
          },
        },
      ]);
    });

    afterAll(async () => {
      const dataset = client.dataset(datasetName);

      // get a list of tables in the dataset
      const [tables] = await dataset.getTables();

      // delete each table in the dataset
      for (const table of tables) {
        await table.delete();
      }

      // delete the dataset
      await dataset.delete();
    });

    it("should raise an error if the driver is not connected to BigQuery", async () => {
      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: [{ name: "John Snow" }],
        filters: "name=\"Jon Snow\"",
      })).rejects.toThrow(/Connection to BigQuery not established/);
    });

    it("should raise an error if filters is empty", async () => {
      await driver.connect();

      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: [{ name: "John Snow" }],
        filters: "",
      })).rejects.toThrow(/BigQuery UPDATE must have a WHERE clause/);
    });

    it("should update rows", async () => {
      await driver.connect();

      const result = await driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: [{ address: { street2: "The King's Landing" } }],
        filters: "address.street2=\"King's Landing\"",
      });

      expect(result.length).toEqual(2);
    });
  });

  describe("deleteData", () => {

  });
});
