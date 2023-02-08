import fs from "fs";
import { Client } from "@elastic/elasticsearch";
import getProxyDriver from "../elasticsearch";

function makeid(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Test: ElasticSearch", () => {
  beforeAll(async () => {

  });

  afterAll(async () => {

  });

  it("should connect to an elasticsearch node", async () => {
    const ELASTICSEARCH_TLS_CA = process.env.ELASTICSEARCH_TLS_CA_PATH ? await fs.promises.readFile(process.env.ELASTICSEARCH_TLS_CA_PATH) : process.env.ELASTICSEARCH_TLS_CA || "";

    const driver = getProxyDriver({
      ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || "https://localhost:9200",
      ELASTICSEARCH_BASIC_USER: process.env.ELASTICSEARCH_BASIC_USER || "elastic",
      ELASTICSEARCH_BASIC_PASSWORD: process.env.ELASTICSEARCH_BASIC_PASSWORD || "changeme",
      ELASTICSEARCH_TLS_CA,
    });

    const result = await driver.testConnection();

    expect(result.success).toBe(true);
  });

  it("should index, update, and delete", async () => {
    const ELASTICSEARCH_TLS_CA = process.env.ELASTICSEARCH_TLS_CA_PATH ? await fs.promises.readFile(process.env.ELASTICSEARCH_TLS_CA_PATH) : process.env.ELASTICSEARCH_TLS_CA || "";

    const driver = getProxyDriver({
      ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || "https://localhost:9200",
      ELASTICSEARCH_BASIC_USER: process.env.ELASTICSEARCH_BASIC_USER || "elastic",
      ELASTICSEARCH_BASIC_PASSWORD: process.env.ELASTICSEARCH_BASIC_PASSWORD || "changeme",
      ELASTICSEARCH_TLS_CA,
    });

    const client = new Client({
      node: process.env.ELASTICSEARCH_URL || "https://localhost:9200",
      auth: {
        username: process.env.ELASTICSEARCH_BASIC_USER || "elastic",
        password: process.env.ELASTICSEARCH_BASIC_PASSWORD || "changeme",
      },
      ...(ELASTICSEARCH_TLS_CA ? { tls: { ca: ELASTICSEARCH_TLS_CA } } : {}),
    });

    const index = `test-${makeid(5)}`;

    await client.indices.create({ index });

    const doc1 = await driver.index({
      index,
      document: {
        character: "Ned Stark",
        quote: "Winter is coming.",
      },
    });

    const doc2 = await driver.index({
      index,
      document: {
        character: "Daenerys Targaryen",
        quote: "I am the blood of the dragon.",
      },
    });

    const doc3 = await driver.index({
      index,
      document: {
        character: "Tyrion Lannister",
        quote: "A mind needs books like a sword needs a whetstone.",
      },
    });

    await client.indices.refresh({ index });

    let result = await client.search({
      index,
      query: {
        match: { quote: "winter" },
      },
    });

    expect(result.hits.hits.length).toBe(1);

    await driver.update({
      index,
      id: doc2._id,
      doc: {
        character: "Daenerys Targaryen",
        quote: "I am the blood of the winter dragon.",
      },
    });

    await client.indices.refresh({ index });

    result = await client.search({
      index,
      query: {
        match: { quote: "winter" },
      },
    });

    expect(result.hits.hits.length).toBe(2);

    await driver.delete({
      index,
      id: doc2._id,
    });

    await client.indices.refresh({ index });

    result = await client.search({
      index,
      query: {
        match: { quote: "winter" },
      },
    });

    expect(result.hits.hits.length).toBe(1);

    await client.indices.delete({ index });
  });

  it("should bulk", async () => {
    const ELASTICSEARCH_TLS_CA = process.env.ELASTICSEARCH_TLS_CA_PATH ? await fs.promises.readFile(process.env.ELASTICSEARCH_TLS_CA_PATH) : process.env.ELASTICSEARCH_TLS_CA || "";

    const driver = getProxyDriver({
      ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || "https://localhost:9200",
      ELASTICSEARCH_BASIC_USER: process.env.ELASTICSEARCH_BASIC_USER || "elastic",
      ELASTICSEARCH_BASIC_PASSWORD: process.env.ELASTICSEARCH_BASIC_PASSWORD || "changeme",
      ELASTICSEARCH_TLS_CA,
    });

    const client = new Client({
      node: process.env.ELASTICSEARCH_URL || "https://localhost:9200",
      auth: {
        username: process.env.ELASTICSEARCH_BASIC_USER || "elastic",
        password: process.env.ELASTICSEARCH_BASIC_PASSWORD || "changeme",
      },
      ...(ELASTICSEARCH_TLS_CA ? { tls: { ca: ELASTICSEARCH_TLS_CA } } : {}),
    });

    const index = `tweets-${makeid(5)}`;

    await client.indices.create({ index });

    // https://github.com/elastic/elasticsearch-js/blob/main/docs/examples/bulk.asciidoc
    const dataset = [{
      id: 1,
      text: "If I fall, don't bring me back.",
      user: "jon",
      date: new Date(),
    }, {
      id: 2,
      text: "Winter is coming",
      user: "ned",
      date: new Date(),
    }, {
      id: 3,
      text: "A Lannister always pays his debts.",
      user: "tyrion",
      date: new Date(),
    }, {
      id: 4,
      text: "I am the blood of the dragon.",
      user: "daenerys",
      date: new Date(),
    }, {
      id: 5, // change this value to a string to see the bulk response with errors
      text: "A girl is Arya Stark of Winterfell. And I'm going home.",
      user: "arya",
      date: new Date(),
    }];

    const operations = dataset.flatMap((doc) => [{ index: { _index: index } }, doc]);

    const bulkResponse = await driver.bulk({ refresh: true, operations });

    expect(bulkResponse.errors).toBe(false);

    const result = await client.search({
      index,
      query: {
        match: { text: "winter" },
      },
    });

    expect(result.hits.hits.length).toBe(1);

    await client.indices.delete({ index });
  });
});
