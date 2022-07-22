const { getConnection } = require("@buildable/mongodb");

const run = async (input) => {
  const { BUILDABLE_MONGODB_CONNECTION_KEY, collection, keys, options = { background: true } } = input;

  verifyInput(input);

  try {
    const db = await getConnection(BUILDABLE_MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).createIndex(keys, options);

    return results;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};

const verifyInput = ({ BUILDABLE_MONGODB_CONNECTION_KEY, collection, keys }) => {
  const ERRORS = {
    NO_BUILDABLE_MONGODB_CONNECTION_KEY: "A valid BUILDABLE_MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an object.",
    INVALID_KEYS: "The keys must be an object.",
    AT_LEAST_ONE_KEY: "At least one key is required.",
  };

  if (!BUILDABLE_MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (keys && typeof keys !== "object") throw new Error(ERRORS.INVALID_KEYS);
  if (keys && !Object.keys(keys).length) throw new Error(ERRORS.AT_LEAST_ONE_KEY);
};
