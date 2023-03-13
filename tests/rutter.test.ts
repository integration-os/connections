import RutterIntegration from "../catalog/sources/rutter/rutter";
import { RutterWebhook } from "../catalog/sources/rutter/lib/types";
import crypto from "crypto";

require("dotenv").config();

describe("Rutter Integration", () => {
  let rutter: RutterIntegration;
  let webhookId: string;

  beforeEach(() => {
    jest.resetAllMocks();

    rutter = new RutterIntegration({
      RUTTER_EMAIL: process.env.RUTTER_EMAIL,
      RUTTER_PASSWORD: process.env.RUTTER_PASSWORD,
      RUTTER_CLIENT_SECRET: process.env.RUTTER_CLIENT_SECRET,
    });
  })

  afterEach(async () => {
    rutter = null;
  })

  describe("init", () => {
    afterEach(async () => {
      jest.resetAllMocks()
      if (webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId }).catch(() => {});
        webhookId = null;
      }
    });

    it("should create a webhook", async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      })

      expect(response.webhookData).toBeDefined();
      expect(response.webhookData).toHaveProperty("id");

      webhookId = (response.webhookData as RutterWebhook).id;
    });

    it("should fail the creation of a webhook if an event does not exist", async () => {
      await expect(() => rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED", "NOT_AN_EVENT", "ORDER_DELETED"],
      })).rejects.toThrow(/Found invalid webhookType NOT_AN_EVENT/g);
    });

    it("should fail the creation of a webhook if email is invalid", async () => {
      rutter = new RutterIntegration({
        RUTTER_EMAIL: "invalid@mail.co",
        RUTTER_PASSWORD: process.env.RUTTER_PASSWORD,
        RUTTER_CLIENT_SECRET: process.env.RUTTER_CLIENT_SECRET,
      });

      await expect(() => rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      })).rejects.toThrow(/There's no user with this email/g);
    })

    it("should fail the creation of a webhook if password is invalid", async () => {
      rutter = new RutterIntegration({
        RUTTER_EMAIL: process.env.RUTTER_EMAIL,
        RUTTER_PASSWORD: "invalid",
        RUTTER_CLIENT_SECRET: process.env.RUTTER_CLIENT_SECRET,
      });

      await expect(() => rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      })).rejects.toThrow(/Invalid login credentials/g);
    })

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      const initSpy = jest.spyOn(rutter.RUTTER_CONNECTION, "init");
      initSpy.mockRejectedValue(error);


      await expect(() => rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      })).rejects.toThrow(/Mocked HTTP 400 Bad Request response/g);
    })

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.init = jest.fn().mockRejectedValue(error);

      await expect(rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      })).rejects.toThrow(/Mocked error/g);
    })
  });

  describe("verifyWebhookSignature", () => {
    const body = {
      custom: "data"
    }

    const originalHash = crypto
      .createHmac("sha256", process.env.RUTTER_CLIENT_SECRET)
      .update(JSON.stringify(body))
      .digest("base64");

    const signature = `sha256=${originalHash}`;

    const headers = {
      "x-rutter-signature": signature,
    }

    const request = {
      body: JSON.stringify(body),
      headers
    }

    it("should return true if the signature is valid", async () => {
      const response = await rutter.verifyWebhookSignature({
        request,
        signature,
        secret: process.env.RUTTER_CLIENT_SECRET
      });

      expect(response).toBeTruthy();
    });

    it("should throw an error if the signature is invalid", async () => {
      await expect(() => rutter.verifyWebhookSignature({
        request,
        signature: "invalid",
        secret: process.env.RUTTER_CLIENT_SECRET
      })).rejects.toThrow(/Invalid signature/g);
    });

    it("should throw an error if the request is invalid is missing", async () => {
      await expect(() => rutter.verifyWebhookSignature({
        request: {
          body: "",
          headers
        },
        signature,
        secret: process.env.RUTTER_CLIENT_SECRET
      })).rejects.toThrow(/Invalid signature/g);
    });
  });

  describe("subscribe", () => {
    beforeEach(async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED"],
      });

      webhookId = (response.webhookData as RutterWebhook).id;
    })

    afterEach(async () => {
      jest.resetAllMocks();
      if (webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId }).catch(() => {});
        webhookId = null;
      }
    })

    it("should subscribe to events", async () => {
      const response = await rutter.subscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      });

      expect(response).toBeTruthy();
      expect(response.webhook).toBeDefined();
      expect(response.webhook.id).toEqual(webhookId);
      expect(response.events.sort()).toEqual(["ORDER_CREATED", "ORDER_DELETED"].sort());
    });

    it("should throw an error if the webhook is not found", async () => {
      await expect(() => rutter.subscribe({
        webhookId: "invalid",
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Could not find any entity/g);
    });

    it("should throw an error if the event is not found", async () => {
      await expect(() => rutter.subscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED", "NOT_AN_EVENT"],
      })).rejects.toThrow(/Found invalid webhookType NOT_AN_EVENT/g);
    });

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      rutter.RUTTER_CONNECTION.updateWebhookEvents = jest.fn().mockRejectedValue(error);


      await expect(() => rutter.subscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Mocked HTTP 400 Bad Request response/g);
    })

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.updateWebhookEvents = jest.fn().mockRejectedValue(error);

      await expect(() => rutter.subscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Mocked error/g);
    })
  });

  describe("unsubscribe", () => {
    beforeEach(async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED", "ORDER_UPDATED", "ORDER_DELETED"],
      });

      webhookId = (response.webhookData as RutterWebhook).id;
    })

    afterEach(async () => {
      jest.resetAllMocks();
      if(webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId }).catch(() => {});
        webhookId = null;
      }
    })

    it("should unsubscribe from events", async () => {
      const response = await rutter.unsubscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      });

      expect(response).toBeTruthy();
      expect(response.webhook).toBeDefined();
      expect(response.webhook.id).toEqual(webhookId);
      expect(response.events.sort()).toEqual(["ORDER_UPDATED"].sort());
    });

    it("should throw an error if the webhook is not found", async () => {
      await expect(() => rutter.unsubscribe({
        webhookId: "invalid",
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Could not find webhook with the given ID/g);
    });

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      rutter.RUTTER_CONNECTION.updateWebhookEvents = jest.fn().mockRejectedValue(error);

      await expect(() => rutter.unsubscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Mocked HTTP 400 Bad Request response/g);

    })

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.updateWebhookEvents = jest.fn().mockRejectedValue(error);

      await expect(() => rutter.unsubscribe({
        webhookId,
        events: ["ORDER_CREATED", "ORDER_DELETED"],
      })).rejects.toThrow(/Mocked error/g);
    })
  });

  describe("getWebhooks", () => {
    beforeEach(async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED", "ORDER_UPDATED", "ORDER_DELETED"],
      });

      webhookId = (response.webhookData as RutterWebhook).id;
    });

    afterEach(async () => {
      jest.resetAllMocks()
      if(webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId }).catch(() => {});
        webhookId = null;
      }
    });

    it("should get a webhook", async () => {
      const response = await rutter.getWebhooks({webhookId});

      expect(response).toBeTruthy();
      expect((response as RutterWebhook).id).toEqual(webhookId);
    });

    it("should throw an error if the webhook is not found", async () => {
      await expect(() => rutter.getWebhooks({webhookId: "invalid"}))
        .rejects
        .toThrow(/Could not find webhook with the given ID/g)
    });

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      rutter.RUTTER_CONNECTION.findWebhookById = jest.fn().mockRejectedValue(error);

      await expect(async () => await rutter.getWebhooks({webhookId}))
        .rejects
        .toThrow(/Mocked HTTP 400 Bad Request response/g);
    })

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.findWebhookById = jest.fn().mockRejectedValue(error);

      await expect(async () => await rutter.getWebhooks({webhookId}))
        .rejects
        .toThrow(/Mocked error/g);
    })
  });

  describe("deleteWebhookEndpoint", () => {
    beforeEach(async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED", "ORDER_UPDATED", "ORDER_DELETED"],
      });

      webhookId = (response.webhookData as RutterWebhook).id;
    });

    afterEach(async () => {
      jest.resetAllMocks();
      if(webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId }).catch(() => {});
        webhookId = null;
      }
    });

    it("should delete a webhook", async () => {
      const response = await rutter.deleteWebhookEndpoint({ webhookId });

      expect(response).toBeTruthy();
      webhookId = null;
    });

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      rutter.RUTTER_CONNECTION.dropWebhook = jest.fn().mockRejectedValue(error);

      await expect(async () => await rutter.deleteWebhookEndpoint({ webhookId }))
        .rejects
        .toThrow(/Mocked HTTP 400 Bad Request response/g);
    });

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.dropWebhook = jest.fn().mockRejectedValue(error);

      await expect(() => rutter.deleteWebhookEndpoint({ webhookId }))
        .rejects
        .toThrow(/Mocked error/g);
    });
  });

  describe("getSubscribedEvents", () => {
    beforeEach(async () => {
      const response = await rutter.init({
        webhookUrl: "https://www.testurl.com/webhook",
        events: ["ORDER_CREATED", "ORDER_UPDATED", "ORDER_DELETED"],
      });

      webhookId = (response.webhookData as RutterWebhook).id;
    });

    afterEach(async () => {
      jest.resetAllMocks();
      if(webhookId) {
        await rutter.deleteWebhookEndpoint({ webhookId });

        webhookId = null;
      }
    });

    it("should get the subscribed events", async () => {
      const response = await rutter.getSubscribedEvents({ webhookId });

      expect(response).toBeTruthy();
      expect(response.sort()).toEqual(["ORDER_CREATED", "ORDER_UPDATED", "ORDER_DELETED"].sort());
    });

    it("should throw an error if the webhook is not found", async () => {
      await expect(() => rutter.getSubscribedEvents({ webhookId: "invalid" }))
        .rejects
        .toThrow(/Could not find webhook with the given ID/g)
    });

    it("should handle Axios errors", async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          statusText: "Bad Request",
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

      rutter.RUTTER_CONNECTION.findWebhookById = jest.fn().mockRejectedValue(error);

      await expect(async () => await rutter.getSubscribedEvents({ webhookId }))
        .rejects
        .toThrow(/Mocked HTTP 400 Bad Request response/g);
    })

    it("should handle other errors", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.findWebhookById = jest.fn().mockRejectedValue(error);

      await expect(async () => await rutter.getSubscribedEvents({ webhookId }))
        .rejects
        .toThrow(/Mocked error/g);
    })
  });

  describe("testConnection", () => {
    it("should return true if the connection is valid", async () => {
      const response = await rutter.testConnection();

      expect(response.success).toBeTruthy();
    });

    it("should return false if the email is invalid", async () => {
      rutter = new RutterIntegration({
        RUTTER_EMAIL: "invalid@mail.co",
        RUTTER_PASSWORD: process.env.RUTTER_PASSWORD,
        RUTTER_CLIENT_SECRET: process.env.RUTTER_CLIENT_SECRET,
      });

      const response = await rutter.testConnection();

      expect(response.success).toBeFalsy();
    });

    it("should return false if the password is invalid", async () => {
      rutter = new RutterIntegration({
        RUTTER_EMAIL: process.env.RUTTER_EMAIL,
        RUTTER_PASSWORD: "invalid",
        RUTTER_CLIENT_SECRET: process.env.RUTTER_CLIENT_SECRET,
      });

      const response = await rutter.testConnection();

      expect(response.success).toBeFalsy();
    });

    it("should throw an error if the client secret is invalid", async () => {
      rutter = new RutterIntegration({
        RUTTER_EMAIL: process.env.RUTTER_EMAIL,
        RUTTER_PASSWORD: process.env.RUTTER_PASSWORD,
        RUTTER_CLIENT_SECRET: "invalid",
      });

      const response = await rutter.testConnection();

      expect(response.success).toBeFalsy();
    });

    it("should return false if an error occurs", async () => {
      const error = new Error("Mocked error");

      rutter.RUTTER_CONNECTION.testConnection = jest.fn().mockRejectedValue(error);

      const response = await rutter.testConnection();

      expect(response.success).toBeFalsy();
    })
  })
})