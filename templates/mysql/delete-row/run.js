/**
 * ----------------------------------------------------------------------------------------------------
 * Delete Row [Run]
 *
 * @description - Delete a row by its ID from a MySQL table
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://knexjs.org
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/knex");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { MYSQL_CONNECTION_KEY, tableName, id } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MYSQL_CONNECTION_KEY);

    const results = await db(tableName).where({ id }).del();

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
    NO_MYSQL_CONNECTION_KEY: `A valid MYSQL_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MySQL Datasource to your project.`,
    NO_TABLE_NAME: "A valid tableName name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!MYSQL_CONNECTION_KEY) throw new Error(ERRORS.NO_MYSQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
  if (!id) throw new Error(ERRORS.NO_ID);
};
