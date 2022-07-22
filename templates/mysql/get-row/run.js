const { getConnection } = require("@buildable/knex");

const run = async (input) => {
  const { BUILDABLE_MYSQL_CONNECTION_KEY, tableName, id } = input;

  verifyInput(input);

  try {
    const db = await getConnection(BUILDABLE_MYSQL_CONNECTION_KEY);

    const results = await db.select().where({ id }).from(tableName);

    return results[0];
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error.data,
      },
    };
  }
};

const verifyInput = ({ BUILDABLE_MYSQL_CONNECTION_KEY, tableName, id }) => {
  const ERRORS = {
    NO_BUILDABLE_MYSQL_CONNECTION_KEY: "A valid BUILDABLE_MYSQL_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_TABLE_NAME: "A valid tableName name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!BUILDABLE_MYSQL_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_MYSQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
  if (!id) throw new Error(ERRORS.NO_ID);
};
