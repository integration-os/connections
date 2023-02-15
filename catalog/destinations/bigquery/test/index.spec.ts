import { BigQuery } from "@google-cloud/bigquery";
import crypto from "crypto";
import getProxyDriver, { BigQueryDriver } from "../bigquery";

describe("Test: BigQuery Destination", () => {
  let driver: BigQueryDriver | null = null;

  it("should reject unknown methods from the proxy object", async () => {
    driver = getProxyDriver(
      {
        GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
        GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
      },
    );

    try {
      (driver as any).unknownMethod();
    } catch (err) {
      expect(err.message).toEqual("Method unknownMethod() not found");
    }

    driver = null;
  });

  describe("connect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should connect to BigQuery", async () => {
      return driver.connect().then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });
    it("should accept service account key as config", async () => {
      return driver.connect({ GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY }).then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });
  });

  describe("disconnect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );

      driver.connect();
    });

    afterEach(() => {
      driver = null;
    });

    it("should disconnect from BigQuery", async () => {
      await driver.disconnect();

      await expect(driver.client).toBeNull();
    });
  });

  describe("testConnection", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should return success=true and a message when successful", async () => {
      await driver.connect();
      const result = await driver.testConnection();

      expect(result).toEqual({
        success: true,
        message: "Connection established successfully",
      });
    });

    it("should return success=false and a message when failed", async () => {
      await driver.connect();

      const querySpy = jest.spyOn(driver.client, "query");
      querySpy.mockImplementation(() => Promise.resolve(null));

      const result = await driver.testConnection();

      expect(result).toEqual({
        success: false,
        message: "Could not establish connection to BigQuery",
      });

      querySpy.mockRestore();
    });

    it("should reconstruct the client when it is not initialized", async () => {
      const result = await driver.testConnection(); // this should issue connect() internally

      expect(result).toEqual({
        success: true,
        message: "Connection established successfully",
      });
    });
  });

  describe("insertData", () => {
    const client = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    });

    const datasetName = `buildable_test_dataset_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;
    const tableName = `buildable_test_table_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;

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
        try {
          await table.delete();
        } catch (err) {
          console.log(err.message);
        }
      }

      // delete the dataset
      try {
        await dataset.delete();
      } catch (err) {
        console.log(err.message);
      }
    });

    beforeEach(async () => {
      driver = getProxyDriver(
        {
          GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );

      await driver.connect();
    });

    afterEach(() => {
      driver = null;
    });

    it("should raise an error if the table does not exist", async () => {
      await expect(driver.insertData({
        dataset: datasetName,
        table: "not-a-real-table",
        data: [{ id: 1, name: "Jon Snow" }],
        options: {},
      })).rejects.toThrow(/BigQuery - table not found/);
    });

    it("should raise an error if the client cannot get the table", async () => {
      // mock connect to prevent client recreation and hence overriding
      // jest spy
      const mockConnect = jest.fn().mockResolvedValue(true);
      driver.connect = mockConnect;

      // mock table getting
      const getSpy = jest
        .spyOn(driver.client, "dataset")
        .mockImplementation(() => ({
          table: () => {
            return {
              get: () => Promise.reject(new Error("Unknown Error Occurred")),
            };
          },
        } as any));

      await expect(driver.insertData({
        dataset: datasetName,
        table: tableName,
        data: [{ id: 1, name: "Jon Snow" }],
        options: {},
      })).rejects.toThrow(/BigQuery - Unknown Error Occurred/);

      mockConnect.mockRestore();
      getSpy.mockRestore();
    });

    it("should raise an error if an extra field is present", async () => {
      await expect(driver.insertData({
        dataset: datasetName,
        table: tableName,
        data: [{ id: 1, name: "Jon Snow", game: "King in The North" }],
        options: {},
      })).rejects.toThrow(/BigQuery - Schema mismatch/);
    }, 15000);

    it("should raise an error if a column type mismatch occurs", async () => {
      await expect(driver.insertData({
        dataset: datasetName,
        table: tableName,
        data: [{ id: "wrong-id", name: "Jon Snow" }],
        options: {},
      })).rejects.toThrow();
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

    const datasetName = `buildable_test_dataset_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;
    const tableName = `buildable_test_table_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;

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
        { name: "age", type: "INTEGER", mode: "NULLABLE" },
        { name: "location", type: "GEOGRAPHY", mode: "NULLABLE" },
        { name: "is_alive", type: "BOOLEAN", mode: "NULLABLE" },
        { name: "date_of_birth", type: "DATE", mode: "NULLABLE" },
        { name: "time_of_birth", type: "TIME", mode: "NULLABLE" },
        { name: "datetime", type: "DATETIME", mode: "NULLABLE" },
        { name: "created_at", type: "TIMESTAMP", mode: "NULLABLE" },
        { name: "other", type: "JSON", mode: "NULLABLE" },
        { name: "bytes", type: "BYTES", mode: "NULLABLE" },
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
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      client
        .dataset(datasetName)
        .table(tableName)
        .query(`DELETE FROM \`${process.env.GCP_PROJECT_ID}.${datasetName}.${tableName}\` WHERE id=1`);

      driver = null;
    });

    it("should raise an error if filters is empty", async () => {
      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: { name: "John Snow" },
        filters: "",
      })).rejects.toThrow(/BigQuery UPDATE must have a WHERE clause/);
    });

    it("should raise if a wrong type is inserted", async () => {
      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: { age: "John Snow" },
        filters: "address.street2=\"King's Landing\"",
      })).rejects.toThrow(/Schema mismatch/);

      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: { is_alive: "yes" },
        filters: "address.street2=\"King's Landing\"",
      })).rejects.toThrow(/Schema mismatch/);
    });

    it("should update rows", async () => {
      const result = await driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: {
          address: { street2: "The King's Landing" },
          age: 28,
          location: "POINT(28.34234 12.32423)",
          is_alive: true,
          created_at: new Date(),
          other: { some: "random", object: "here" },
          bytes: "should be converted to bytes",
        },
        filters: "address.street2=\"King's Landing\"",
      });

      expect(result.length).toBeGreaterThan(0);
    });

    it("should accept an array of string changesets", async () => {
      const result = await driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: ["name=\"Jaime Lannister\"", "age=32"],
        filters: "address.street2=\"King's Landing\"",
      });

      expect(result.length).toBeGreaterThan(0);
    });

    it("should handle stringified dates and times", async () => {
      const result = await driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: {
          date_of_birth: "1421-05-15",
          time_of_birth: "09:00:04",
          datetime: "2015-10-10 17:10:12",
          created_at: "2015-10-10 17:10:12",
        },
        filters: "address.street2=\"King's Landing\"",
      });

      expect(result.length).toBeGreaterThan(0);
    });

    it("should accept Date objects", async () => {
      const result = await driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: {
          date_of_birth: new Date("1421-05-15"),
          time_of_birth: new Date("1421-05-15 09:00:04"),
          datetime: new Date("2015-10-10 17:10:12"),
          created_at: new Date("2015-10-10 17:10:12"),
        },
        filters: "address.street2=\"King's Landing\"",
      });

      expect(result.length).toBeGreaterThan(0);
    });

    it("should refuse invalid dates", async () => {
      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: {
          date_of_birth: "not-a-date",
          time_of_birth: "not-a-date",
          datetime: "not-a-date",
          created_at: "not-a-date",
        },
        filters: "address.street2=\"King's Landing\"",
      })).rejects.toThrow();
    });

    it("should refuse non-existing columns", async () => {
      await expect(driver.updateData({
        dataset: datasetName,
        table: tableName,
        set: {
          new: "field",
        },
        filters: "address.street2=\"King's Landing\"",
      })).rejects.toThrow(/Schema mismatch/);
    });
  });

  describe("deleteData", () => {
    const client = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    });

    const datasetName = `buildable_test_dataset_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;
    const tableName = `buildable_test_table_${crypto.randomBytes(4).toString("hex").slice(0, 8)}`;

    beforeAll(async () => {
      // create a temporary BigQuery dataset
      const dataset = client.dataset(datasetName);
      await dataset.create();

      // create a temporary table within the dataset
      const table = dataset.table(tableName);
      await table.create({ schema: [
        { name: "id", type: "INTEGER", mode: "REQUIRED" },
        { name: "name", type: "STRING", mode: "REQUIRED" },
      ],
      });
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
          GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should raise an error if filters is empty", async () => {
      await expect(driver.deleteData({
        dataset: datasetName,
        table: tableName,
        filters: "",
      })).rejects.toThrow(/BigQuery DELETE must have a WHERE clause/);
    });

    it("should delete rows", async () => {
      const result = await driver.deleteData({
        dataset: datasetName,
        table: tableName,
        filters: "name=\"Jon snow\"",
      });

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
