import bytes from "bytes";
import ftp from "ftp";
import { TestConnection } from "../../../types/sourceClassDefinition";

interface FTPConfig {
  name: string;
  FTP_HOST: string;
  FTP_PORT: string;
  FTP_USER: string;
  FTP_PASSWORD: string;
  FTP_PATH: string;
  FTP_EXTRACTOR_ENABLED: boolean;
  FTP_SCAN_INTERVAL: string;
  FTP_EXTRACTOR_FILE_TYPE: string;
  FTP_EXTRACTOR_RECORD_COUNT_LIMIT: number;
  FTP_EXTRACTOR_FILE_SIZE_LIMIT: string;
}

const handleMaximumExtractorFileSize = (extractorFileSizeLimit: string) => {
  let extractorFileSizeBytes: number = bytes.parse(extractorFileSizeLimit);

  if (extractorFileSizeBytes < 0)
    throw new Error("Invalid file size limit. Please use a valid file size limit (e.g. 5mb, 100mb, 1gb, etc.");

  if (extractorFileSizeBytes > bytes.parse("5gb")) {
    extractorFileSizeBytes = bytes.parse("5gb");
  }

  return extractorFileSizeBytes;
};

const EVENT_NAMES = [
  "connection.connected",
  "connection.disconnected",
  "connection.failed",
  "files-metadata.scanned",
  "files-metadata.state.processed",
  "file.added",
  "file.updated",
  "file.deleted",
  "file.parsed",
  "file.parsed.failed",
  "record.parsed",
  "record.unknown",
  "record.size.maximum-limit-exceeded",
];

const getFTPClient = (config: {
  FTP_HOST: string;
  FTP_PORT: number;
  FTP_USER: string;
  FTP_PASSWORD: string;
  FTP_PATH: string;
}): Promise<boolean> => {
  // eslint-disable-next-line new-cap
  const client = new ftp();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout error'));
      client.end();
    }, 5000);

    client.connect({
      host: config.FTP_HOST,
      port: config.FTP_PORT,
      user: config.FTP_USER,
      password: config.FTP_PASSWORD,
    });

    client.on("ready", () => {
      clearTimeout(timeout);

      client.list(config.FTP_PATH, (err, list) => {
        if (err) reject(err);

        resolve(true);
      });

      // resolve(true);
    });

    client.on("error", (err: any) => {
      reject(err);
    });
  });
};

export default class FTP {
  FTP_HOST: string;

  FTP_PORT: number;

  FTP_USER: string;

  FTP_PASSWORD: string;

  FTP_PATH: string;

  FTP_EXTRACTOR_ENABLED: boolean;

  FTP_SCAN_INTERVAL: string;

  FTP_EXTRACTOR_FILE_TYPE: string;

  FTP_EXTRACTOR_RECORD_COUNT_LIMIT: number;

  FTP_EXTRACTOR_FILE_SIZE_LIMIT: number;

  constructor({
    FTP_HOST,
    FTP_PORT = "21",
    FTP_USER,
    FTP_PASSWORD,
    FTP_PATH = ".",
    FTP_EXTRACTOR_ENABLED = true,
    FTP_SCAN_INTERVAL = "15 minutes",
    FTP_EXTRACTOR_RECORD_COUNT_LIMIT = 1,
    FTP_EXTRACTOR_FILE_TYPE = "csv",
    FTP_EXTRACTOR_FILE_SIZE_LIMIT = "100mb",
  }: FTPConfig) {
    this.FTP_HOST = FTP_HOST;
    this.FTP_PORT = parseInt(FTP_PORT, 10);
    this.FTP_USER = FTP_USER;
    this.FTP_PASSWORD = FTP_PASSWORD;
    this.FTP_PATH = FTP_PATH;
    this.FTP_EXTRACTOR_ENABLED = FTP_EXTRACTOR_ENABLED;
    this.FTP_SCAN_INTERVAL = FTP_SCAN_INTERVAL;
    this.FTP_EXTRACTOR_RECORD_COUNT_LIMIT = FTP_EXTRACTOR_RECORD_COUNT_LIMIT;
    this.FTP_EXTRACTOR_FILE_TYPE = FTP_EXTRACTOR_FILE_TYPE;
    this.FTP_EXTRACTOR_FILE_SIZE_LIMIT = handleMaximumExtractorFileSize(FTP_EXTRACTOR_FILE_SIZE_LIMIT);
  }

  async init({ events }) {
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
      events: EVENT_NAMES,
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
        FTP_PATH: this.FTP_PATH,
      });

      return {
        success: true,
        message: `Connection to ${this.FTP_HOST} tested successfully!`,
      };
    } catch (err) {
      if (err.message.match(/File not found/gi)) {
        err.message = "Directory not found";
      }

      throw new Error(
        `Unable to connect to ${this.FTP_HOST}: ${err.message}`,
      );
    }
  }
}
