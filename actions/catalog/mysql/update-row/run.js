const { getConnection } = require("@buildable/knex");

const run = async (input) => {
  const { MYSQL_CONNECTION_KEY, tableName, id, ...fieldsToUpdate } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MYSQL_CONNECTION_KEY);

    const results = await db(tableName)
      .where({ id })
      .update({ ...fieldsToUpdate });

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

const verifyInput = ({ MYSQL_CONNECTION_KEY, tableName, id }) => {
  const ERRORS = {
    NO_MYSQL_CONNECTION_KEY: "A valid MYSQL_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_TABLE_NAME: "A valid tableName name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!MYSQL_CONNECTION_KEY) throw new Error(ERRORS.NO_MYSQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
  if (!id) throw new Error(ERRORS.NO_ID);
};
