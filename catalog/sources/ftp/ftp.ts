import { TestConnection } from "../../../types/sourceClassDefinition";
import bytes from "bytes";
import ftp from "ftp";

interface FTPConfig {
  name: string;
  FTP_HOST: string;
  FTP_PORT: string;
  FTP_USER: string;
  FTP_PASSWORD: string;
  FTP_PATH: string;
  FTP_SCAN_INTERVAL: string;
  FTP_EXTRACTOR_FILE_TYPE: string;
  FTP_EXTRACTOR_FILE_SIZE_LIMIT: string;
};

const handleMaximumExtractorFileSize = (extractorFileSizeLimit: string) => {
  let extractorFileSizeBytes: number = bytes.parse(extractorFileSizeLimit);

  if (extractorFileSizeBytes < 0) 
    throw new Error("Invalid file size limit. Please use a valid file size limit (e.g. 5mb, 100mb, 1gb, etc.");

  if (extractorFileSizeBytes > bytes.parse("5gb")) {
    extractorFileSizeBytes = bytes.parse("5gb");
  }

  return extractorFileSizeBytes;
}

const EVENT_NAMES = ["file.uploaded", "file.updated", "file.deleted", "file.opened", "file.closed", "file.item.parsed"];

const getFTPClient = (config: {
  FTP_HOST: string;
  FTP_PORT: number;
  FTP_USER: string;
  FTP_PASSWORD: string;
}): Promise<boolean> => {
  const client = new ftp();

  return new Promise((resolve, reject) => {
    client.connect({
      host: config.FTP_HOST,
      port: config.FTP_PORT,
      user: config.FTP_USER,
      password: config.FTP_PASSWORD,
    });

    client.on('ready', () => {
      resolve(true);
    });

    client.on('error', (err: any) => {
      reject(err);
    });
  });
}

export default class FTP {
  FTP_HOST: string;
  FTP_PORT: number;
  FTP_USER: string;
  FTP_PASSWORD: string;
  FTP_PATH: string;
  FTP_SCAN_INTERVAL: string;
  FTP_EXTRACTOR_FILE_TYPE: string;
  FTP_EXTRACTOR_FILE_SIZE_LIMIT: number;

  constructor({
    FTP_HOST,
    FTP_PORT = "21",
    FTP_USER,
    FTP_PASSWORD,
    FTP_PATH = ".",
    FTP_SCAN_INTERVAL = "15 minutes",
    FTP_EXTRACTOR_FILE_TYPE = "csv",
    FTP_EXTRACTOR_FILE_SIZE_LIMIT = "100mb",
  }: FTPConfig) {
    this.FTP_HOST = FTP_HOST;
    this.FTP_PORT = parseInt(FTP_PORT);
    this.FTP_USER = FTP_USER;
    this.FTP_PASSWORD = FTP_PASSWORD;
    this.FTP_PATH = FTP_PATH;
    this.FTP_SCAN_INTERVAL = FTP_SCAN_INTERVAL;
    this.FTP_EXTRACTOR_FILE_TYPE = FTP_EXTRACTOR_FILE_TYPE;
    this.FTP_EXTRACTOR_FILE_SIZE_LIMIT = handleMaximumExtractorFileSize(FTP_EXTRACTOR_FILE_SIZE_LIMIT);
  }

  async init({ webhookUrl, events }) {
    return {
      webhookData: {},
      events,
    };
  }

  async verifyWebhookSignature({ request, signature, secret }) {
    // Validation falls on the user to implement
    return true;
  }

  async subscribe({ webhookId, events }) {
    return {
      webhook: {},
      events: EVENT_NAMES
    };
  }

  async unsubscribe({ webhookId, events }) {
    return {
      events: EVENT_NAMES,
      webhook: {},
    };
  }

  async getWebhooks() {
    return [];
  }

  async getSubscribedEvents({ webhookId }) {
    return EVENT_NAMES;
  }

  async deleteWebhookEndpoint({ webhookId }) {
    return true;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      await getFTPClient({
        FTP_HOST: this.FTP_HOST,
        FTP_PORT: this.FTP_PORT,
        FTP_USER: this.FTP_USER,
        FTP_PASSWORD: this.FTP_PASSWORD,
      });

      return {
        success: true,
        message: `Connection to ${this.FTP_HOST} tested successfully!`,
      };
    } catch (err) {
      throw new Error(
        `Unable to connect to ${this.FTP_HOST}: ${err.message}`,
      );
    }
  }
}
