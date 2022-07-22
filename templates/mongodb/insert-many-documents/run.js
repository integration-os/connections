const { getConnection } = require("@buildable/mongodb");
const uuid = require("uuid").v4;

const run = async (input) => {
  const { BUILDABLE_MONGODB_CONNECTION_KEY, collection, entities } = input;

  verifyInput(input);

  try {
    const createdDate = new Date();
    const createdAt = createdDate.getTime();

    const db = await getConnection(BUILDABLE_MONGODB_CONNECTION_KEY);

    const updatedEntities = entities.map((doc) => ({
      _id: cleanUUID(),
      createdAt,
      createdDate,
      ...doc,
    }));

    const results = await db.collection(collection).insertMany(updatedEntities);

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

const verifyInput = ({ BUILDABLE_MONGODB_CONNECTION_KEY, collection, entities }) => {
  const ERRORS = {
    NO_BUILDABLE_MONGODB_CONNECTION_KEY: "A valid BUILDABLE_MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
    NO_ENTITIES: "A valid entities array is required.",
    ENTITIES_ELEMENTS_NOT_OBJECT: "Entities must be an array of objects.",
  };

  if (!BUILDABLE_MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!entities || !Array.isArray(entities)) throw new Error(ERRORS.NO_ENTITIES);
  if (entities.some((doc) => typeof doc !== "object" || Array.isArray(doc)))
    throw new Error(ERRORS.ENTITIES_ELEMENTS_NOT_OBJECT);
};

const cleanUUID = () => uuid().replace(/-/g, "");
