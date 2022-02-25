/**
 * ----------------------------------------------------------------------------------------------------
 * Group and Get Sum [Run]
 *
 * @description - Group by and get the sum of a field in a MongoDB collection
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.find/
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
  const { MONGODB_CONNECTION_KEY, collection, query = {}, fieldToSum, fieldToGroupBy } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const aggregate = await db
      .collection(collection)
      .aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: fieldToGroupBy ? `$${fieldToGroupBy}` : "",
            sum: { $sum: `$${fieldToSum}` },
          },
        },
      ])
      .toArray();

    return aggregate;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, query, fieldToSum, fieldToGroupBy }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an object.",
    NO_FIELD_TO_SUM: "A valid field to sum is required.",
    INVALID_FIELD_TO_GROUP_BY: "The field to group by must be a string.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
  if (!fieldToSum || typeof fieldToSum !== "string") throw new Error(ERRORS.NO_FIELD_TO_SUM);
  if (fieldToGroupBy && typeof fieldToGroupBy !== "string")
    throw new Error(ERRORS.INVALID_FIELD_TO_GROUP_BY);
};
