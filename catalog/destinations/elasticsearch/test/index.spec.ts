import getProxyDriver from "../elasticsearch";
import fs from "fs";

describe('Test: ElasticSearch', () => {
    
  
  beforeAll(async () => {

  });

  afterAll(async () => {

  });

it("should connect to an elasticsearch node", async () => {
    const ELASTIC_SEARCH_TLS_CA = process.env.ELASTIC_SEARCH_TLS_CA_PATH ? await fs.promises.readFile(process.env.ELASTIC_SEARCH_TLS_CA_PATH) : process.env.ELASTIC_SEARCH_TLS_CA || ""

    const driver = getProxyDriver({
      ELASTIC_SEARCH_URI: process.env.ELASTIC_SEARCH_URI || "https://localhost:9200",
      ELASTIC_SEARCH_BASIC_USER: process.env.ELASTIC_SEARCH_BASIC_USER || "elastic",
      ELASTIC_SEARCH_BASIC_PASSWORD: process.env.ELASTIC_SEARCH_BASIC_PASSWORD || "changeme",
      ELASTIC_SEARCH_TLS_CA,
    });

    const result = await driver.testConnection();

    expect(result.success).toBe(true);
});

});