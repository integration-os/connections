/**
 * ----------------------------------------------------------------------------------------------------
 * CRUD API [Run]
 *
 * @description - A full CRUD API for MongoDB
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/mongodb");
const uuid = require("uuid").v4;

const DOCUMENT_NOT_FOUND_ERROR = "Document not found.";

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { MONGODB_CONNECTION_KEY, collection, action, id, method, ...payload } = input;

  verifyInput(input);

  try {
    const db = await getConnection(MONGODB_CONNECTION_KEY);
    let results;

    switch (true) {
      case method === "GET" && action === "get":
        try {
          results = await db.collection(collection).findOne({
            _id: id,
          });

          if (!results) throw new Error(DOCUMENT_NOT_FOUND_ERROR);

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

      case method === "POST" && action === "create":
        const _id = cleanUUID();
        const createdDate = new Date();
        const createdAt = createdDate.getTime();

        results = await db.collection(collection).insertOne({
          _id,
          createdAt,
          createdDate,
          ...payload,
        });

        return results;

      case method === "POST" && action === "list":
        const { query, fields = [], pageSize = 10, page = 1, sort = { createdAt: -1 } } = payload;

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

      case method === "PATCH" && action === "update":
        try {
          const updatedDate = new Date();
          const updatedAt = updatedDate.getTime();

          results = await db.collection(collection).update(
            {
              _id: id,
            },
            { $set: { updatedDate, updatedAt, ...payload } },
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
      case method === "DELETE" && action === "delete":
        try {
          results = await db.collection(collection).remove(
            {
              _id: id,
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
      default:
        throw new Error(
          `${method} /:collection/${action} is not supported.
          Available actions are:
          GET /:collection/get
          POST /:collection/create
          POST /:collection/list
          PATCH /:collection/update
          DELETE /:collection/delete`,
        );
    }
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

const verifyInput = ({ MONGODB_CONNECTION_KEY, collection, action }) => {
  const ERRORS = {
    NO_MONGODB_CONNECTION_KEY: `A valid MONGODB_CONNECTION_KEY is required. 
                                 You can add one to your environment variables at 
                                 https://app.buildable.dev/settings/environment-variables. 
                                 You may also need to add a MongoDB Datasource to your project.`,
    NO_COLLECTION: `A valid collection name is required. 
      You can add it to the flow's url params ex: your-flow-34e32af/:collection`,
    NO_ACTION: `A valid action is required. 
      You can add it to the flow's url params ex: your-flow-34e32af/:collection/:action`,
  };

  if (!MONGODB_CONNECTION_KEY) throw new Error(ERRORS.NO_MONGODB_CONNECTION_KEY);
  if (!collection || typeof collection !== "string") throw new Error(ERRORS.NO_COLLECTION);
  if (!action || typeof action !== "string") throw new Error(ERRORS.NO_ACTION);
};

const cleanUUID = () => uuid().replace(/-/g, "");

const convertArrayToMongoProjection = (arr) =>
  arr.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
