/**
 * ----------------------------------------------------------------------------------------------------
 * Find Distinct Values [Run]
 *
 * @description - Given a specified field from a MongoDB collection,
 *                find distinct values and return an array
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.distinct/
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/mongodb");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { MONGODB_CONNECTION_KEY, collection, field, query = {}, options = {} } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).distinct(field, query, options);

    return results;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, query, field }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    NO_FIELD: "A valid field name is required.",
    INVALID_QUERY: "The query must be an object.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!field || typeof field !== "string") throw new Error(ERRORS.NO_FIELD);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
};
