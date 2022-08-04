const { getConnection } = require("@buildable/knex");

const run = async (input) => {
  const { POSTGRESQL_CONNECTION_KEY, tableName, query = {} } = input;

  verifyInput(input);

  try {
    const db = await getConnection(POSTGRESQL_CONNECTION_KEY);

    const total = Number.parseInt((await db(tableName).where(query).count())[0].count);

    return total;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

const verifyInput = ({ POSTGRESQL_CONNECTION_KEY, tableName, query }) => {
  const ERRORS = {
    NO_POSTGRESQL_CONNECTION_KEY:
      "A valid POSTGRESQL_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_TABLE_NAME: "A valid tableName name is required.",
    INVALID_QUERY: "The query must be an object.",
  };

  if (!POSTGRESQL_CONNECTION_KEY) throw new Error(ERRORS.NO_POSTGRESQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
};
