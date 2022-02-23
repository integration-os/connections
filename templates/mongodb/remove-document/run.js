/**
 * ----------------------------------------------------------------------------------------------------
 * Remove Document [Run]
 *
 * @description - Remove a document by its ID from a MongoDB collection
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.remove/
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection, ObjectId } = require("@buildable/mongodb");

const DOCUMENT_NOT_FOUND_ERROR = "Document not found.";

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { MONGODB_CONNECTION_KEY, collection, id, convertToObjectId } = input;

  verifyInput(input);

  try {
    const _id = convertToObjectId ? ObjectId(id) : id;

    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).remove(
      {
        _id,
      },
      { justOne: true },
    );

    if (results.deletedCount === 0) throw new Error(DOCUMENT_NOT_FOUND_ERROR);

    return results;
  } catch (error) {
    let status = 400;
    if (error.message === DOCUMENT_NOT_FOUND_ERROR) status = 404;

    return {
      failed: true,
      message: error.message,
      data: {
        status,
        ...error.data,
      },
    };
  }
};

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, id }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                You can add one to your environment variables at 
                                https://app.buildable.dev/settings/environment-variables. 
                                You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!id) throw new Error(ERRORS.NO_ID);
};
