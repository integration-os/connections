const { getConnection } = require("@buildable/firestore");
const uuid = require("uuid");

const run = async (input) => {
  const { BUILDABLE_FIRESTORE_CONNECTION_KEY, collection, id, ...fieldsToInsert } = input;

  verifyInput(input);

  try {
    const db = await getConnection(BUILDABLE_FIRESTORE_CONNECTION_KEY);

    return await db
      .collection(collection)
      .doc(id || uuid.v4())
      .set({ ...fieldsToInsert });
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

const verifyInput = ({ BUILDABLE_FIRESTORE_CONNECTION_KEY, collection }) => {
  const ERRORS = {
    NO_BUILDABLE_FIRESTORE_CONNECTION_KEY: "A valid BUILDABLE_FIRESTORE_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!BUILDABLE_FIRESTORE_CONNECTION_KEY) throw new Error(ERRORS.NO_BUILDABLE_FIRESTORE_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
};
