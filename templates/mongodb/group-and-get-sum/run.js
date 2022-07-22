const { getConnection } = require("@buildable/mongodb");

const run = async (input) => {
  const { BUILDABLE_MONGODB_CONNECTION_KEY, collection, query = {}, fieldToSum, fieldToGroupBy } = input;

  verifyInput(input);

  try {
    const db = await getConnection(BUILDABLE_MONGODB_CONNECTION_KEY);

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

const verifyInput = ({ BUILDABLE_MONGODB_CONNECTION_KEY, collection, query, fieldToSum, fieldToGroupBy }) => {
  const ERRORS = {
    NO_BUILDABLE_MONGODB_CONNECTION_KEY: "A valid BUILDABLE_MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an object.",
    NO_FIELD_TO_SUM: "A valid field to sum is required.",
    INVALID_FIELD_TO_GROUP_BY: "The field to group by must be a string.",
  };

  if (!BUILDABLE_MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
  if (!fieldToSum || typeof fieldToSum !== "string") throw new Error(ERRORS.NO_FIELD_TO_SUM);
  if (fieldToGroupBy && typeof fieldToGroupBy !== "string")
    throw new Error(ERRORS.INVALID_FIELD_TO_GROUP_BY);
};
