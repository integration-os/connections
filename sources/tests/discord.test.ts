import { AnyObject } from "../types/classDefinition";

require("dotenv").config();

import DiscordIntegration, {
  DISCORD_INVALID_SIGNATURE_ERROR,
  DISCORD_WEBHOOK_DELETE_ERROR,
  DISCORD_WEBHOOK_WARNING,
} from "../catalog/discord/Discord";

const discord = new DiscordIntegration({
  DISCORD_PUBLIC_KEY: '5ef3f3d9a6fc382574f262eac907ed2a6da388b09ef88de1497deb0e4f696731'
});


describe("Discord Integration", () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  const testWebhookUrl = "https://example.com/webhook";

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("init", () => {
    it("should initialize the integration", async () => {
      const { webhookData, events } = await discord.init({
        webhookUrl: testWebhookUrl,
        events: []
      });

      expect(webhookData.webhookUrl).toBe(testWebhookUrl);
      expect(events).toEqual(["any"]);
    });

    it("should display a warning if initialized with events", async () => {
      await discord.init({
        webhookUrl: testWebhookUrl,
        events: ['commands']
      });
      expect(consoleWarnSpy).toHaveBeenCalledWith(DISCORD_WEBHOOK_WARNING);
    });
  });

  describe("verifyWebhookSignature", () => {
    it('should throw an error if request has no signature header',  () => {
      const request = {
        headers: {
          "X-Signature-Timestamp": "1660942086"
        },
        body: JSON.stringify({type: 1})
      };
      expect(() => discord.verifyWebhookSignature({ request })).toThrowError(DISCORD_INVALID_SIGNATURE_ERROR);
    });

    it('should throw an error if request has no timestamp header',  () => {
      const request = {
        headers: {
          "X-Signature-Ed25519": "6dd355667fae4eb43c6e0ab92e870edb2de0a88cae12dbd8591507f584fe4912babff497f1b8edf9567d2483d54ddc6459bea7855281b7a246a609e3001a4e08"
        },
        body: JSON.stringify({type: 1})
      };
      expect(() => discord.verifyWebhookSignature({ request })).toThrowError(DISCORD_INVALID_SIGNATURE_ERROR);
    });

    it('should throw an error if request has an invalid signature',  () => {
      const request = {
        headers: {
          "X-Signature-Timestamp": "1660942086",
          "X-Signature-Ed25519": "6dd355667fae4eb43c6e0ab92e870edb2de0a88cae12dbd8591507f584fe4912babff497f1b8edf9567d2483d54ddc6459bea7855281b7a246a609e3001a4e08"
        },
        body: JSON.stringify({type: 1})
      };
      expect(() => discord.verifyWebhookSignature({ request })).toThrowError(DISCORD_INVALID_SIGNATURE_ERROR);
    });

    it('should throw an error if request has an invalid signature',  () => {
      const request = {
        headers: {
          "X-Signature-Timestamp": "1660942086",
          "X-Signature-Ed25519": "6dd355667fae4eb43c6e0ab92e870edb2de0a88cae12dbd8591507f584fe4912babff497f1b8edf9567d2483d54ddc6459bea7855281b7a246a609e3001a4e08"
        },
        body: JSON.stringify({type: 1})
      };
      expect(() => discord.verifyWebhookSignature({ request })).toThrowError(DISCORD_INVALID_SIGNATURE_ERROR);
    });

    it('should return true if request has an valid signature',  () => {
      const request = {
        headers: {
          "X-Signature-Timestamp": "1660943211",
          "X-Signature-Ed25519": "77a84ff6b0ce977f94c9de673aff380a8617df4a0033fa97e6f44835d58992a64cd819749a814c213e430ef36fc30a9c1e2946345699f560ad2f142046b9c202"
        },
        body: '{"application_id":"1010055401213009951","id":"1010293790860382270","token":"aW50ZXJhY3Rpb246MTAxMDI5Mzc5MDg2MDM4MjI3MDpGbzRzZWdPSk9xTUZFRWs0Q3BPMDVPUWdHbFBkMW1vdHVhRVNzOEtVSURHUXB3THREWTRmTGRMVEdUTzBkOU5OWjZ4ckFzZEhSdHliTXZwVVpNWGR6OVIyUWVqWDMxUkFUeTZVT1ozZElUa1VpOE8yMzBTRlNEd0lpTFV0VmF5WQ","type":1,"user":{"avatar":null,"avatar_decoration":null,"discriminator":"5423","id":"755709172456226816","public_flags":0,"username":"Vini"},"version":1}'
      };

      const hasValidSignature = discord.verifyWebhookSignature({ request });
      expect(hasValidSignature).toBe(true);
    });
  });

  describe("subscribe", () => {
    it("should display a warning and return 'any' events", async () => {
      await discord.subscribe();
      expect(consoleWarnSpy).toHaveBeenCalledWith(DISCORD_WEBHOOK_WARNING);
    });
  });

  describe("unsubscribe", () => {
    it("should display a warning and return 'any' events", async () => {
      await discord.unsubscribe();
      expect(consoleWarnSpy).toHaveBeenCalledWith(DISCORD_WEBHOOK_WARNING);
    });
  });

  describe("getWebhooks", () => {
    it("should return the default webhook information", async () => {
      const webhook = await discord.getWebhooks();
      expect(webhook.webhookData.webhookUrl).toBe(testWebhookUrl);
      expect(webhook.events).toEqual(['any']);
    });
  });

  describe("getSubscribedEvents", () => {
    it("should return the default event information", async () => {
      const events = await discord.getSubscribedEvents();
      expect(events).toEqual(['any']);
    });
  });

  describe("deleteWebhookEndpoint", () => {
    it("should throw an error", () => {
      discord.deleteWebhookEndpoint().catch(error => {
        expect(error).toEqual(new Error(DISCORD_WEBHOOK_DELETE_ERROR));
      });
    });
  });
});
