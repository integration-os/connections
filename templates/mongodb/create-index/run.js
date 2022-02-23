/**
 * ----------------------------------------------------------------------------------------------------
 * Create Index [Run]
 *
 * @description - Create an index on a MongoDB collection
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/
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
  const { MONGODB_CONNECTION_KEY, collection, keys, options = { background: true } } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).createIndex(keys, options);

    return results;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, keys }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an object.",
    INVALID_KEYS: "The keys must be an object.",
    AT_LEAST_ONE_KEY: "At least one key is required.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (keys && typeof keys !== "object") throw new Error(ERRORS.INVALID_KEYS);
  if (keys && !Object.keys(keys).length) throw new Error(ERRORS.AT_LEAST_ONE_KEY);
};
