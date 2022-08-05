const { getConnection } = require("@buildable/firestore");

const DOCUMENT_NOT_FOUND_ERROR = "Document not found.";

const run = async (input) => {
  const { FIRESTORE_CONNECTION_KEY, collection, id } = input;

  verifyInput(input);

  try {
    const db = await getConnection(FIRESTORE_CONNECTION_KEY);

    const doc = await db.collection(collection).doc(id).get();

    if (!doc.exists) {
      throw new Error(DOCUMENT_NOT_FOUND_ERROR);
    }

    return await db.collection(collection).doc(id).delete();
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

const verifyInput = ({ FIRESTORE_CONNECTION_KEY, collection, id }) => {
  const ERRORS = {
    NO_FIRESTORE_CONNECTION_KEY:
      "A valid FIRESTORE_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!FIRESTORE_CONNECTION_KEY) throw new Error(ERRORS.NO_FIRESTORE_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!id) throw new Error(ERRORS.NO_ID);
};
