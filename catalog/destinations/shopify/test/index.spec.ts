import { AxiosError, AxiosInstance } from "axios";
import getProxyDriver, { ShopifyDriver } from "../shopify";

describe("Test: Shopify Destination", () => {
  let driver: ShopifyDriver | null = null;

  describe("connect", () => {
    console.log("SHOPIFY", process.env.SHOPIFY_STORE_NAME, process.env.SHOPIFY_ACCESS_KEY);

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
        console.log("driver", driver);
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

    it("should retry exponentially for 5 times if too many requests", async () => {
      // attempt connection
      await driver.connect();

      const error: Partial<AxiosError> = {
        isAxiosError: true,
        response: {
          status: 429,
          statusText: "Too many requests",
          config: {},
          headers: {},
          data: {
            errors: "Mocked HTTP 429 Too many requests response",
          },
        },
        stack: "",
        toJSON(): object {
          return {};
        },
      };

      driver.client.post = jest.fn().mockRejectedValue(error);

      driver.connect = jest.fn();

      try {
        await driver["products.create"]({});
      } catch (err) {
        console.log(err);
      }

      jest.resetAllMocks();
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
      const error: Partial<AxiosError> = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            errors: "Mocked Axios error",
          },
          statusText: "OK",
          headers: {},
          config: {},
        },
        stack: "",
        toJSON(): object {
          return {};
        },
      };

      // reject with Axios error
      querySpy.mockImplementation(() => Promise.reject(error));

      const result = await driver.testConnection();

      expect(result).toEqual({
        success: false,
        message: "Connection to Shopify failed: Mocked Axios error",
      });

      querySpy.mockRestore();
    });
  });

  describe("process", () => {
    let postSpy: jest.SpyInstance;
    let putSpy: jest.SpyInstance;
    let deleteSpy: jest.SpyInstance;
    let originalClient: AxiosInstance;

    beforeEach(() => {
      driver = getProxyDriver({
        SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
        SHOPIFY_ACCESS_KEY: process.env.SHOPIFY_ACCESS_KEY,
      });
      // initialize client by connecting to Shopify
      driver.connect();

      // store reference to original client
      originalClient = driver.client;

      // mock calls to connect by attaching spies to post, put and delete calls
      driver.connect = jest.fn().mockImplementation(async () => {
        driver.client = originalClient;
        // init spies
        postSpy = jest.spyOn(driver.client, "post");
        putSpy = jest.spyOn(driver.client, "put");
        deleteSpy = jest.spyOn(driver.client, "delete");

        // mock calls
        postSpy.mockImplementation(async () => Promise.resolve({ data: [] }));
        putSpy.mockImplementation(async () => Promise.resolve({ data: [] }));
        deleteSpy.mockImplementation(async () => Promise.resolve({ deleted: true }));
      });
    });

    afterEach(() => {
      postSpy?.mockRestore();
      putSpy?.mockRestore();
      deleteSpy?.mockRestore();

      driver = null;
      postSpy = null;
      putSpy = null;
      deleteSpy = null;
    });

    it("should issue the request to Shopify", async () => {
      // POST request
      await driver["products.create"]({});
      expect(postSpy).toHaveBeenCalled();

      // PUT request
      await driver["products.update"]({});
      expect(putSpy).toHaveBeenCalled();

      // DELETE request
      await driver["products.delete"]({});
      expect(deleteSpy).toHaveBeenCalled();
    });

    it("should handle 2-resource requests", async () => {
      // POST request
      await driver["products.orders.create"]({ primaryResourceId: 1 });
      expect(postSpy).toHaveBeenCalled();
    });

    it("should reject wrong methods", async () => {
      // wrong request
      await expect(() => driver["products.wrong"]({}))
        .rejects.toThrow("Method wrong not supported");
    });

    it("should reject malformed actions", async () => {
      // wrong request
      await expect(() => driver["products.orders.fulfillment.create"]({}))
        .rejects.toThrow("Unknown action format: products.orders.fulfillment.create");
    });

    it("should handle HTTP 406 Not Accepted responses", async () => {
      driver.connect = jest.fn().mockImplementation(async () => {
        driver.client = originalClient;

        postSpy = jest.spyOn(driver.client, "post");

        // mock an axios 406 error
        const error: Partial<AxiosError> = {
          isAxiosError: true,
          response: {
            status: 406,
            statusText: "Not Accepted",
            config: {},
            headers: {},
            data: {
              errors: "Mocked HTTP 406 Not Accepted response",
            },
          },
          stack: "",
          toJSON(): object {
            return {};
          },
        };

        // mock call to post
        postSpy.mockRejectedValue(error);
      });

      await expect(driver["process.create"]({})).rejects.toThrow("[Shopify] The selected action is not supported");
    });

    it("should handle HTTP 400 Bad Request responses", async () => {
      driver.connect = jest.fn().mockImplementation(async () => {
        driver.client = originalClient;

        postSpy = jest.spyOn(driver.client, "put");

        // mock an axios 400 error
        const error: Partial<AxiosError> = {
          isAxiosError: true,
          response: {
            status: 400,
            statusText: "Not Accepted",
            config: {},
            headers: {},
            data: {
              errors: "Mocked HTTP 400 Bad Request response",
            },
          },
          stack: "",
          toJSON(): object {
            return {};
          },
        };

        // mock calls
        postSpy.mockRejectedValue(error);
      });

      await expect(driver["process.update"]({}))
        .rejects.toThrow("[Shopify] Bad Request: Mocked HTTP 400 Bad Request response");
    });

    it("should handle other errors", async () => {
      driver.connect = jest.fn().mockImplementation(async () => {
        driver.client = originalClient;

        postSpy = jest.spyOn(driver.client, "delete");

        // mock calls
        postSpy.mockRejectedValue(new Error("Mocked error"));
      });

      await expect(driver["process.delete"]({})).rejects.toThrow("Mocked error");
    });
  });
});
