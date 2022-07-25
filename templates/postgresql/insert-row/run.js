const { getConnection } = require("@buildable/knex");

const run = async (input) => {
  const { BUILDABLE_POSTGRESQL_CONNECTION_KEY, tableName, ...fieldsToInsert } = input;

  verifyInput(input);

  try {
    const db = await getConnection(BUILDABLE_POSTGRESQL_CONNECTION_KEY);

    const results = await db(tableName).insert({ ...fieldsToInsert });

    return results;
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

const verifyInput = ({ BUILDABLE_POSTGRESQL_CONNECTION_KEY, tableName }) => {
  const ERRORS = {
    NO_BUILDABLE_POSTGRESQL_CONNECTION_KEY: "A valid BUILDABLE_POSTGRESQL_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_TABLE_NAME: "A valid tableName name is required.",
  };

  if (!BUILDABLE_POSTGRESQL_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_POSTGRESQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
};
