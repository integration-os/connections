const { getConnection, ObjectId } = require("@buildable/mongodb");

const DOCUMENT_NOT_FOUND_ERROR = "Document not found.";

const run = async (input) => {
  const { BUILDABLE_MONGODB_CONNECTION_KEY, collection, id, convertToObjectId, ...fieldsToUpdate } = input;

  verifyInput(input);

  try {
    const _id = convertToObjectId ? ObjectId(id) : id;
    const updatedDate = new Date();
    const updatedAt = updatedDate.getTime();

    const db = await getConnection(BUILDABLE_MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).update(
      {
        _id,
      },
      { $set: { updatedDate, updatedAt, ...fieldsToUpdate } },
    );

    if (results.matchedCount === 0) throw new Error(DOCUMENT_NOT_FOUND_ERROR);

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

const verifyInput = ({ BUILDABLE_MONGODB_CONNECTION_KEY, collection, id }) => {
  const ERRORS = {
    NO_BUILDABLE_MONGODB_CONNECTION_KEY: "A valid BUILDABLE_MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!BUILDABLE_MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!id) throw new Error(ERRORS.NO_ID);
};
