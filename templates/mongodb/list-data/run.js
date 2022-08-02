const { getConnection } = require("@buildable/mongodb");

const run = async (input) => {
  const {
    MONGODB_CONNECTION_KEY,
    collection,
    query,
    fields = [],
    pageSize = 10,
    page = 1,
    sort = { createdAt: -1 },
  } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MONGODB_CONNECTION_KEY);

    const rowsPromise = db
      .collection(collection)
      .find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .project(convertArrayToMongoProjection(fields))
      .sort(sort)
      .toArray();

    const totalPromise = db.collection(collection).countDocuments(query);

    const [rows, total] = (await Promise.all([rowsPromise, totalPromise])) || [[], 0];

    return {
      rows,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
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
  MONGODB_CONNECTION_KEY,
  collection,
  query,
  fields,
  pageSize = 10,
  page = 1,
  sort = { createdAt: -1 },
}) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: "A valid MONGODB_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    NO_COLLECTION: "A valid collection name is required.",
    INVALID_QUERY: "The query must be an object.",
    INVALID_PAGESIZE: "The pageSize must be a number.",
    INVALID_PAGE: "The page must be a number.",
    INVALID_SORT: "The sort must be an object.",
    INVALID_FIELDS: "The fields must be an array.",
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
  if (pageSize && typeof pageSize !== "number") throw new Error(ERRORS.INVALID_PAGESIZE);
  if (page && typeof page !== "number") throw new Error(ERRORS.INVALID_PAGE);
  if (sort && typeof sort !== "object") throw new Error(ERRORS.INVALID_SORT);
  if (fields && !Array.isArray(fields)) throw new Error(ERRORS.INVALID_FIELDS);
};

const convertArrayToMongoProjection = (arr) =>
  arr.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
