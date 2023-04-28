import crypto from "crypto";
import { Admin } from "kafkajs";
import getProxyDriver, { KafkaDriver } from "../kafka";

describe("Test: Kafka Destination", () => {
  let driver: KafkaDriver | null = null;

  it("should reject unknown methods from the proxy object", async () => {
    driver = getProxyDriver(
      {
        KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
        KAFKA_USERNAME: process.env.KAFKA_USERNAME,
        KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
      },
    );

    try {
      (driver as any).unknownMethod();
      expect(false).toBe(true);
    } catch (err) {
      expect(err.message).toEqual("Method unknownMethod() not found");
    }
  });

  it("should log and raise an error from within the proxy object", async () => {
    driver = getProxyDriver(
      {
        KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
        KAFKA_USERNAME: process.env.KAFKA_USERNAME,
        KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
      },
    );

    driver.pushData = jest.fn().mockImplementation(() => Promise.reject(new Error("Mocked error")));

    expect(driver.producer).toBeNull();

    await expect(driver.pushData({ topic: "topic_0", data: "my data" })).rejects.toThrow("Mocked error");

    jest.resetAllMocks();
  });

  describe("connect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
          KAFKA_USERNAME: process.env.KAFKA_USERNAME,
          KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
          KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should connect to Kafka", async () => {
      return driver.connect().then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });
    it("should accept config passed as arguments", async () => {
      return driver.connect({ KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
        KAFKA_USERNAME: process.env.KAFKA_USERNAME,
        KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
      }).then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });
  });

  describe("disconnect", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
          KAFKA_USERNAME: process.env.KAFKA_USERNAME,
          KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
          KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
        },
      );

      driver.connect();
    });

    afterEach(() => {
      driver = null;
    });

    it("should disconnect from Kafka", async () => {
      await driver.disconnect();

      await expect(driver.client).toBeNull();
    });
  });

  describe("testConnection", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
          KAFKA_USERNAME: process.env.KAFKA_USERNAME,
          KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
          KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
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

      const adminSpy = jest.spyOn(driver.client, "admin");
      adminSpy.mockImplementation((_config?) => {
        return {
          connect: () => Promise.reject(new Error("Mocked error")),
        } as Admin;
      });

      const result = await driver.testConnection();

      expect(result).toEqual({
        success: false,
        message: "Kafka connection failed: Mocked error",
      });

      adminSpy.mockRestore();
    });

    it("should reconstruct the client when it is not initialized", async () => {
      const result = await driver.testConnection(); // this should issue connect() internally

      expect(result).toEqual({
        success: true,
        message: "Connection established successfully",
      });
    });
  });

  describe("pushData", () => {
    const topic = "topic_0";

    beforeEach(() => {
      driver = getProxyDriver(
        {
          KAFKA_BROKER_URLS: process.env.KAFKA_BROKER_URLS,
          KAFKA_USERNAME: process.env.KAFKA_USERNAME,
          KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
          KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
        },
      );

      driver.connect();
    });

    afterEach(() => {
      driver.disconnect();
      driver = null;
    });

    it("should push string data to a Kafka topic", async () => {
      await driver.connect();

      const data = crypto.randomBytes(20).toString("hex");

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });

    it("should push string array data to a Kafka topic", async () => {
      await driver.connect();

      const data = [
        crypto.randomBytes(20).toString("hex"),
        crypto.randomBytes(20).toString("hex"),
        crypto.randomBytes(20).toString("hex"),
      ];

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });

    it("should push buffer data to a Kafka topic", async () => {
      await driver.connect();

      const data = crypto.randomBytes(20);

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });

    it("should push buffer array data to a Kafka topic", async () => {
      await driver.connect();

      const data = [
        crypto.randomBytes(20),
        crypto.randomBytes(20),
        crypto.randomBytes(20),
      ];

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });

    it("should push object data to a Kafka topic", async () => {
      await driver.connect();

      const data = {
        foo: "bar",
        bar: "baz",
      };

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });

    it("should push object array data to a Kafka topic", async () => {
      await driver.connect();

      const data = [
        {
          foo: "bar",
          bar: "baz",
        },
        {
          foo: "baz",
          bar: "foo",
        },
        {
          foo: "foo",
          bar: "bar",
        },
      ];

      const result = await driver.pushData({ topic, data });

      await driver.disconnect();

      for (const r of result) {
        expect(r.errorCode).toEqual(0);
      }
    });
  });
});
