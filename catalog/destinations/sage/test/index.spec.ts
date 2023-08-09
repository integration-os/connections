import getProxyDriver, { SageDriver } from "../sage";

describe("Test: Sage Destination", () => {
  let driver: SageDriver | null = null;

  const oauth2 = {
    redirectUri: "http://localhost:3000/callback",
    scopes: ["full_access"],
    resolved: {
      access_token: "eyJhbGciOiJSUzUxMiIsImtpZCI6IjNwX2VsSXBnQkNwY0dRYkpzNGVUTFlzYWdQVjQ1Z01pU1RidElfSWVxTzA9In0.eyJqdGkiOiJiMWVmZWQ1Zi01YWE2LTQ2YjctYmNkYi05ZDM5NjgzMDFjZWYiLCJpYXQiOjE1Mjc1MTAwMzMsImV4cCI6MTUyNzUxMDMzMywiaXNzIjoib2F1dGguYXdzLnNiYy1hY2NvdW50aW5nLnNhZ2UuY29tIiwic3ViIjoiNDQ0IiwiYXVkIjoiYXBpLnNiYy1hY2NvdW50aW5nLnNhZ2UuY29tIiwiYXpwIjoiMzMzIiwiY291bnRyeSI6InVzIiwic2NvcGVzIjoiYWNjb3VudHM6cncgYWNjb3VudGluZzpydyBjb3JlOnJ3In0.NnE2Wxt5BTZa6m2vh8fcH54gyWRFciZWuVq8KrtbLJLatMUHxQAo4WY3Tht6HmhpI-oq-yxg5LADtvRRDbxFrBTnXOGm6Go3-UdBC6OADo_18PrtpN6e1FiY-BV9k16zJyiB_R8pQXPTVSp_9XXBqpNSJGqJ__sIdYPLx0wrkWorI73DLR_0KSFVs5dFufPpdhmBZ_BhfSd3Fe1B4ErVo8m28jP_6QFNt2ssZAxufidVnk3wXAyqN0fka-tMjK7OrEenGQl_PAVLxhvMhpw6PRDxKYfoPUmmcaqTkZLK7aTFP0m23BtRwSs6ezRqzQzsbUgIWkUTSzh6tfVFDVheEz8tLhctU_OqvcoNmufCMV7kDYQ0_JRcGnMN5MTaMnVG49NQ0sWsmsD9drOfuN6bJeJFu-F5GAL3BAUP6UZcunj0a9I1WAEs0Zf5sEEQkDK2VOJ-mh5JVOkdbUnfverETaI5i0X_kCVgjP1q1Glq5xv8Mm85kO-0kLuO3VOHAM70_ln9e8_gcIIpBuerVFrwFUX1SFBu1JUNWq6_TfIh3WkehkYpK33aQy-dnRg0dgkx_MVyGenIvqvcTGzd9l7SNgqyzoOeY01LJb-NQBKDgGFbyNrUhvud7f4O68AaabDDntSQmlBrxPNqF-bAPYlpb90kD6NKUb9YiM7z6wnij4o",
      scopes: "full_access",
      token_type: "bearer",
      expires_in: 300,
      refresh_token: "eyJhbGciOiJSUzUxMiIsImtpZCI6IjNwX2VsSXBnQkNwY0dRYkpzNGVUTFlzYWdQVjQ1Z01pU1RidElfSWVxTzA9In0.eyJqdGkiOiI0Yjk1MmQxYy04OGEwLTQxZjUtYjdiNS0wMDVmOTc4ODg5YjYiLCJpYXQiOjE1Mjc1MTAwNjIsImV4cCI6MTUyNzUxMDM2MiwiaXNzIjoib2F1dGguYXdzLnNiYy1hY2NvdW50aW5nLnNhZ2UuY29tIiwic3ViIjoiNDQ0IiwiYXVkIjoiYXBpLnNiYy1hY2NvdW50aW5nLnNhZ2UuY29tIiwiYXpwIjoiMzMzIiwiY291bnRyeSI6InVzIiwic2NvcGVzIjoiYWNjb3VudHM6cncgYWNjb3VudGluZzpydyBjb3JlOnJ3In0.QQZ4bzOnrGUnNjYsJfK_FBNxKz1jGpF0Z-ur4wCoOTERi2W4iosX1N7ksdkRfUKSJlWlOfPp2XNMxszONmqZHczPjmVNUc0er1qo-oDmPJfbcH305sWmMFqspfoaUOCVXu_TcAh5Dz_zBUAznhBGbx603SBidvjMIa9Jncy9SjjYrJqhzz4y1-vgST4hccGCbsORGB_U6yKgfS6bupzoLVDdCj2bsgG4hSiDqagXbpAsoh9vR2UBALsJz8PUEEW7qA81B7SjtLUiHbvzryKhMt-7Q631D2j_iQaGpld1aICMBfAL0h5wiJMjf6r9R-EcJOmSzWtCcTI0y-PJfprinxIo3Mg_sljfoe_0wrEikIWRQIQa3D40nhMnLtqevCftPscQjLO_vf_ERUICHTiJdXiKsSwmUp9EGKnWC_qEKOcVA-o7y_vsAuFODsUvXC9k6Z7sVCg2k37k8r4NqoJ82d_l4ZrgNnvV6VEL2xtuASIA46-MlWWTPTbuQkzyfmVQW1gg50q4tNT8XkvVil6F2rNCiLSA2vhsH8lLu8mcSfCqVaPJh9-XvtjSkKUAtjgA3aa8bJEuUXFRn-U6Z7TyMZGHRZCEg-1IZa49rOQ5FhfvD85MQL466vAdr7X1zwVqxvr1T3UW58NuKMr3FyAWRyQhp_bBB8AXdf4W1BIeYLk",
      refresh_token_expires_in: 2678400,
      requested_by_id: "c3c32d1c-41ba-483f-a3ff-49fdb57b9c38",
    },
  };

  // mock implementation of driver.client

  it("should reject unknown methods from the proxy object", async () => {
    driver = getProxyDriver({
      SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
      SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
      oauth2,
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
        SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
        SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
        oauth2,
      });
    });

    afterEach(async () => {
      driver = null;
    });

    it("should create an Axios client for Sage", async () => {
      await driver.connect();

      expect(driver.client).toBeDefined();
    });

    it("should setup Authorization header on the client", async () => {
      await driver.connect();

      expect((driver.client.defaults.headers as any).Authorization).toMatch(/Bearer /);
    });

    it("should setup Sage API base URL on the client", async () => {
      await driver.connect();

      expect(driver.client.defaults.baseURL).toBe("https://api.accounting.sage.com/v3.1");
    });

    it("should accept init arguments from config", async () => {
      driver = getProxyDriver({});
      await driver.connect({
        SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
        SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
        oauth2,
      });

      expect(driver.client).toBeDefined();
    });
  });

  describe("disconnect", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
        SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
        oauth2,
      });

      await driver.connect();
    });

    afterEach(async () => {
      driver = null;
    });

    it("should disconnect from Sage", async () => {
      expect(driver.client).toBeDefined();

      await driver.disconnect();

      expect(driver.client).toBeNull();
    });
  });

  describe("testConnection", () => {
    beforeEach(async () => {
      driver = getProxyDriver({
        SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
        SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
        oauth2,
      });
    });

    afterEach(async () => {
      driver = null;
      jest.clearAllMocks();
    });

    it("should return success=true and a message when successful", async () => {
      await driver.connect();

      const getSpy = jest.spyOn(driver.client, "get");
      getSpy.mockImplementation(() => Promise.resolve(null));

      const result = await driver.testConnection();

      expect(result.success).toBe(true);
    });

    it("should return success=false and a message when unsuccessful", async () => {
      await driver.connect();

      const getSpy = jest.spyOn(driver.client, "get");
      getSpy.mockImplementation(() => Promise.reject(new Error("Test error")));

      const result = await driver.testConnection();

      expect(result.success).toBe(false);
    });
  });

  describe("performAction", () => {
    let proxyDriver: Partial<SageDriver>;

    beforeEach(async () => {
      const config = {
        SAGE_CLIENT_ID: process.env.SAGE_CLIENT_ID,
        SAGE_CLIENT_SECRET: process.env.SAGE_CLIENT_SECRET,
        oauth2,
      };

      driver = new SageDriver(config);
      proxyDriver = getProxyDriver(config);

      await proxyDriver.connect();
    });

    afterEach(() => {
      driver = null;
      proxyDriver = null;
      jest.clearAllMocks();
    });

    it("should accept `resource.method` actions", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      // mocking the connect method to avoid the client being overwritten by performAction
      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.create", {});

      expect(postSpy).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should accept `resource.secondary.method` actions", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.entries.create", {});

      expect(postSpy).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should refuse malformed actions (missing method)", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      try {
        await proxyDriver.performAction("journals", {});
      } catch (err) {
        expect(err.message).toBe("Invalid action: journals");
      }
    });

    it("should append `id` when passed in the data", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.create", { id: "test" });

      expect(postSpy).toHaveBeenCalledWith(
        "/journals/test",
        undefined,
        { params: undefined },
      );
      expect(result.success).toBe(true);
    });

    it("should append `id` and secondary resource", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.entries.create", { id: "test" });

      expect(postSpy).toHaveBeenCalledWith(
        "/journals/test/entries",
        undefined,
        { params: undefined },
      );
      expect(result.success).toBe(true);
    });

    it("should refuse malformed actions (contains more than three parts)", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      try {
        await proxyDriver.performAction("journals.entries.create.test", {});
      } catch (err) {
        expect(err.message).toBe("Invalid action: journals.entries.create.test");
      }
    });

    it("should make post requests when the method is `create`", async () => {
      const postSpy = jest.spyOn(proxyDriver.client, "post");
      postSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.create", {});

      expect(postSpy).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should make put requests when the method is `update`", async () => {
      const putSpy = jest.spyOn(proxyDriver.client, "put");
      putSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.update", {});

      expect(putSpy).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should make delete requests when the method is `delete`", async () => {
      const deleteSpy = jest.spyOn(proxyDriver.client, "delete");
      deleteSpy.mockImplementation(() => Promise.resolve({ data: { success: true } }));

      proxyDriver.connect = jest.fn().mockResolvedValue({});

      const result = await proxyDriver.performAction("journals.delete", {});

      expect(deleteSpy).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should raise an error if the method is not recognised", async () => {
      proxyDriver.connect = jest.fn().mockResolvedValue({});

      await expect(proxyDriver.performAction("journals.unknown", {})).rejects.toThrowError(/Invalid action method: unknown/);
    });
  });
});
