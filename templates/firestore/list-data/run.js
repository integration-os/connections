/**
 * ----------------------------------------------------------------------------------------------------
 * List Data [Run]
 *
 * @description - List data from a Firestore collection with pagination and filtering
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/firestore");

const MISSING_STARTAT_FIELD_IN_SORT_ERROR = "sort must contain the startAtField";

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    FIRESTORE_CONNECTION_KEY,
    collection,
    query,
    fields = [],
    pageSize = 10,
    startAt,
    startAtField,
    sort = {},
  } = input;

  verifyInput(input);

  try {
    const db = await getConnection(FIRESTORE_CONNECTION_KEY);

    let snapshot = await db.collection(collection);

    if (Array.isArray(query)) {
      if (Array.isArray(query[0])) {
        // multiple queries
        for (let q of query) {
          snapshot = snapshot.where(...q);
        }
      } else {
        snapshot = snapshot.where(...query);
      }
    }

    if (fields.length > 0) {
      snapshot = snapshot.select(...fields);
    }

    if(pageSize > 200) {
      throw new Error("The optimized value for pageSize is less than or equal to 200")
    }

    snapshot = snapshot.limit(pageSize);

    let sortKeys = Object.keys(sort);
    if (sortKeys.length > 0) {
      sortKeys.forEach((key) => {
        if (sort[key] === -1) {
          snapshot = snapshot.orderBy(key, "desc");
        } else {
          snapshot = snapshot.orderBy(key, "asc");
        }
      });
    }

    if (startAt) {
      if (!sortKeys.includes(startAtField)) {
        throw new Error(MISSING_STARTAT_FIELD_IN_SORT_ERROR);
      }
      snapshot = snapshot.startAt(startAt);
    }

    let result = await snapshot.get();

    const rows = [];

    result.forEach((doc) => rows.push({ ...doc.data(), id: doc.id }));

    return {
      rows,
      startAt,
      pageSize,
    };
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

const verifyInput = ({
  FIRESTORE_CONNECTION_KEY,
  collection,
  query,
  fields,
  pageSize = 10,
  sort = { createdAt: -1 },
}) => {
  const ERRORS = {
    NO_FIRESTORE_CONNECTION_KEY: `A valid FIRESTORE_CONNECTION_KEY is required. 
                                 You can add one to your environment variables at 
                                 https://app.buildable.dev/settings/environment-variables. 
                                 You may also need to add a Firestore Datasource to your project.`,
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an array.",
    INVALID_PAGESIZE: "The pageSize must be a number.",
    INVALID_PAGE: "The page must be a number.",
    INVALID_SORT: "The sort must be an object.",
    INVALID_FIELDS: "The fields must be an array.",
  };

  if (!FIRESTORE_CONNECTION_KEY) throw new Error(ERRORS.NO_FIRESTORE_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (query && !Array.isArray(query)) throw new Error(ERRORS.INVALID_QUERY);
  if (pageSize && typeof pageSize !== "number") throw new Error(ERRORS.INVALID_PAGESIZE);
  if (sort && typeof sort !== "object") throw new Error(ERRORS.INVALID_SORT);
  if (fields && !Array.isArray(fields)) throw new Error(ERRORS.INVALID_FIELDS);
};
