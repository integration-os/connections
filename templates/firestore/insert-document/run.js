/**
 * ----------------------------------------------------------------------------------------------------
 * Insert Document [Run]
 *
 * @description - Insert a single document into a Firestore collection
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/firestore");
const uuid = require("uuid");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { FIRESTORE_CONNECTION_KEY, collection, id, ...fieldsToInsert } = input;

  verifyInput(input);

  try {
    const db = await getConnection(FIRESTORE_CONNECTION_KEY);

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

const verifyInput = ({ FIRESTORE_CONNECTION_KEY, collection }) => {
  const ERRORS = {
    NO_FIRESTORE_CONNECTION_KEY: `A valid FIRESTORE_CONNECTION_KEY is required. 
                                 You can add one to your environment variables at 
                                 https://app.buildable.dev/settings/environment-variables. 
                                 You may also need to add a Firestore Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    NO_ID: "A valid id is required.",
  };

  if (!FIRESTORE_CONNECTION_KEY) throw new Error(ERRORS.NO_FIRESTORE_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
};
