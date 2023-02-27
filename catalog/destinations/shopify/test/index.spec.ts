import { AxiosError } from "axios";
import getProxyDriver, { ShopifyDriver } from "../shopify";

describe("Test: Shopify Destination", () => {
  let driver: ShopifyDriver | null = null;

  describe("connect", () => {
    beforeEach(() => {
      driver = getProxyDriver({
        SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
        SHOPIFY_ACCESS_KEY: process.env.SHOPIFY_ACCESS_KEY,
      });
    });

    afterEach(() => {
      driver = null;
    });

    it("should connect to Shopify", async () => {
      return driver.connect().then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });

    it("should accept configuration as config argument", async () => {
      driver = getProxyDriver({});

      return driver.connect({
        SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
        SHOPIFY_ACCESS_KEY: process.env.SHOPIFY_ACCESS_KEY }).then(async () => {
        const result = await driver.testConnection();

        expect(result.success).toBeTruthy();
      });
    });
  });

  describe("disconnect", () => {
    beforeEach(() => {
      driver = getProxyDriver({
        SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
        SHOPIFY_ACCESS_KEY: process.env.SHOPIFY_ACCESS_KEY,
      });

      driver.connect();
    });

    afterEach(() => {
      driver = null;
    });

    it("should disconnect from Shopify", async () => {
      await driver.disconnect();

      await expect(driver.client).toBeNull();
    });
  });

  describe("testConnection", () => {
    beforeEach(() => {
      driver = getProxyDriver(
        {
          SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
          SHOPIFY_ACCESS_KEY: process.env.SHOPIFY_ACCESS_KEY,
        },
      );
    });

    afterEach(() => {
      driver = null;
    });

    it("should return success=true and a message on success", async () => {
      await driver.connect();
      const result = await driver.testConnection();

      expect(result).toEqual({
        success: true,
        message: "Connection to Shopify was successful",
      });
    });

    it("should return success=false and a message on failure", async () => {
      await driver.connect();

      const querySpy = jest.spyOn(driver.client, "get");

      querySpy.mockImplementation(() => Promise.reject(new Error("Mocked error")));

      const result = await driver.testConnection();

      expect(result).toEqual({
        success: false,
        message: "Connection to Shopify failed: Mocked error",
      });

      querySpy.mockRestore();
    });

    it("should return success=false and a message on axios failure", async () => {
      await driver.connect();

      const querySpy = jest.spyOn(driver.client, "get");

      // mock Axios error
      const err = new AxiosError();

      err.response = {
        status: 400,
        data: {
          errors: "Mocked Axios error",
        },
        statusText: "OK",
        headers: {},
        config: {},
      };

      // reject with Axios error
      querySpy.mockImplementation(() => Promise.reject(err));

      const result = await driver.testConnection();

      expect(result).toEqual({
        success: false,
        message: "Connection to Shopify failed: Mocked Axios error",
      });

      querySpy.mockRestore();
    });
  });

  describe("process", () => {
    xit("should parse 2-part actions correctly", () => {});
    xit("should parse 3-part actions correctly", () => {});
    xit("should reject malformed actions", () => {});
    xit("should extract the HTTP method correctly", () => {});
    xit("should reject unknown methods from actions", () => {});
    xit("should handle HTTP 406 Not Accepted responses", () => {});
    xit("should handle HTTP 400 Bad Request responses", () => {});
    xit("should handle other errors", () => {});
  });
});
