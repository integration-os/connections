const { getConnection, ObjectId } = require("@buildable/mongodb");

const DOCUMENT_NOT_FOUND_ERROR = "Document not found.";

const run = async (input) => {
  const { MONGODB_CONNECTION_KEY, collection, id, convertToObjectId, field, inc } = input;

  verifyInput(input);

  try {
    const _id = convertToObjectId ? ObjectId(id) : id;
    const updatedDate = new Date();
    const updatedAt = updatedDate.getTime();

    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const results = await db.collection(collection).update(
      {
        _id,
      },
      { $inc: { [field]: inc }, $set: { updatedDate, updatedAt } },
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

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, id, field, inc }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY:
      "A valid MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
    NO_FIELD: "A valid field is required.",
    NO_INC: "A valid increment value is required.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!id) throw new Error(ERRORS.NO_ID);
  if (!field || typeof field !== "string") throw new Error(ERRORS.NO_FIELD);
  if (!inc || typeof inc !== "number") throw new Error(ERRORS.NO_INC);
};
