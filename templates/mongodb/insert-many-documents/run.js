/**
 * ----------------------------------------------------------------------------------------------------
 * Insert Documents [Run]
 *
 * @description - Insert many documents into a MongoDB collection
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/mongodb");
const uuid = require("uuid").v4;

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { MONGODB_CONNECTION_KEY, collection, entities } = input;

  verifyInput(input);

  try {
    const createdDate = new Date();
    const createdAt = createdDate.getTime();

    const db = await getConnection(MONGODB_CONNECTION_KEY);

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

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, entities }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
    NO_ENTITIES: "A valid entities array is required.",
    ENTITIES_ELEMENTS_NOT_OBJECT: "Entities must be an array of objects.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!entities || !Array.isArray(entities)) throw new Error(ERRORS.NO_ENTITIES);
  if (entities.some((doc) => typeof doc !== "object" || Array.isArray(doc)))
    throw new Error(ERRORS.ENTITIES_ELEMENTS_NOT_OBJECT);
};

const cleanUUID = () => uuid().replace(/-/g, "");
