import getProxyDriver, { XeroDriver } from "../xero";
import axios from "axios";

jest.mock("axios");

describe("Test: Xero Destination", () => {
  let driver: XeroDriver | null = null;

  const oauth2 = {
    redirectUri: "http://localhost:3000/callback",
    scopes: ["openid", "profile", "email", "accounting.transactions"],
    resolved: {
      access_token: "access_token",
      expires_at: 1999999999,
      expires_in: 1999999999,
      id_token: "id_token",
      refresh_token: "refresh_token",
    },
  };

  // mock implementation of driver.client

  it("should reject unknown methods from the proxy object", async () => {
    driver = getProxyDriver({
      XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
      XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
    });

    try {
      (driver as any).unknownMethod();
    } catch (err) {
      expect(err.message).toBe("Method unknownMethod() not found");
    }
  });

  describe("connect", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
        XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
        oauth2,
      });

      const mockedResponse = { data: [{ tenantId: "tenant1" }, { tenantId: "tenant2" }, { tenantId: "tenant3" }] };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);
    });

    afterEach(async () => {
      driver = null;
      jest.clearAllMocks();
    });

    it("should connect to Xero", async () => {
      await driver.connect();

      expect(driver.client).toBeDefined();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should accept init arguments from config", async () => {
      driver = getProxyDriver({
        XERO_CLIENT_ID: "",
        XERO_CLIENT_SECRET: "",
        oauth2: {},
      });

      await driver.connect({
        XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
        XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
        oauth2,
      });

      expect(driver.client).toBeDefined();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should set up tenant ids correctly", async () => {
      await driver.connect();

      expect(driver.tenantIds).toEqual(["tenant1", "tenant2", "tenant3"]);
    });

    it("should throw an error if the connection fails", async () => {
      (axios.get as jest.Mock).mockRejectedValue({
        message: "Mocked error"
      });

      try {
        await driver.connect({
          XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
          XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
          oauth2,
        });

        fail("Should have thrown an error");
      } catch (err) {
        expect(err.message).toBe("Mocked error");
      }
    });
  });

  describe("disconnect", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
        XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
        oauth2,
      });
    });

    afterEach(async () => {
      driver = null;
    });

    it("should disconnect from Xero", async () => {
      const mockedResponse = { data: [{ tenantId: "tenant1" }, { tenantId: "tenant2" }, { tenantId: "tenant3" }] };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      await driver.connect();

      expect(driver.client).toBeDefined()

      await driver.disconnect();

      expect(driver.client).toBeNull();
    });
  });

  describe("testConnection", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
        XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
        oauth2,
      });

      const mockedResponse = { data: [{ tenantId: "tenant1" }, { tenantId: "tenant2" }, { tenantId: "tenant3" }] };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);
    });

    afterEach(async () => {
      driver = null;
      jest.clearAllMocks()
    });

    it("should return success=true and a message when successful", async () => {
      await driver.connect();

      driver.client.accountingApi.getAccounts = jest.fn().mockResolvedValue({});

      const result = await driver.testConnection();

      expect(result.success).toBe(true);
    })

    it("should return success=false and a message when unsuccessful", async () => {
      await driver.connect();

      driver.client.accountingApi.getAccounts = jest.fn().mockRejectedValue({});

      const result = await driver.testConnection();
      expect(result.success).toBe(false);
    })

  });

  describe("performAction", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        XERO_CLIENT_ID: process.env.XERO_CLIENT_ID,
        XERO_CLIENT_SECRET: process.env.XERO_CLIENT_SECRET,
        oauth2,
      });

      const mockedResponse = { data: [{ tenantId: "tenant1" }, { tenantId: "tenant2" }, { tenantId: "tenant3" }] };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);
    });

    afterEach(async () => {
      driver = null;
      jest.clearAllMocks();
    });

    it("should return a response for each tenant", async () => {
      await driver.connect();

      const result = await driver.performAction("accounting.getAccounts", {});

      expect(result).toBeDefined()
      expect(Object.keys(result)).toHaveLength(3);
    });

    it("should raise an error if the passed method does not exist", async () => {
      await driver.connect();

      try {
        await driver.performAction("accounting.getNonExistent", {});
        fail("Should have thrown an error");
      } catch (err) {
        expect(err.message).toBe("Method accounting.getNonExistent() for Xero not found");
      }
    });

    it("should raise an error if the passed api does not exist", async () => {
      await driver.connect();

      try {
        await driver.performAction("nonExistent.getAccounts", {});
        fail("Should have thrown an error");
      } catch (err) {
        expect(err.message).toBe("API nonExistent for Xero not found");
      }
    })
  });
});
