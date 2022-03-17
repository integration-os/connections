/**
 * ----------------------------------------------------------------------------------------------------
 * List Rows [Run]
 *
 * @description - List rows from a PostgreSQL table with pagination and filtering
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://knexjs.org
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { getConnection } = require("@buildable/knex");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    POSTGRESQL_CONNECTION_KEY,
    tableName,
    query = {},
    fields = [],
    page = 1,
    sort = {},
  } = input;
  let { pageSize = 10 } = input

  verifyInput(input);

  try {
    const db = await getConnection(POSTGRESQL_CONNECTION_KEY);

    let orderBy = Object.keys(sort).map((key) => {
      return {
        column: key,
        order: sort[key] === -1 ? "desc" : "asc",
      };
    });

    if(pageSize > 200) {
      throw new Error("The optimized value for pageSize is less than or equal to 200")
    }

    const rows = await db
      .select(...fields)
      .from(tableName)
      .where(query)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(page > 1 ? page * pageSize : 0);

    const total = Number.parseInt((await db(tableName).where(query).count())[0].count);

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
  POSTGRESQL_CONNECTION_KEY,
  tableName,
  query,
  fields,
  pageSize = 10,
  page = 1,
  sort = { createdAt: -1 },
}) => {
  const ERRORS = {
    NO_POSTGRESQL_CONNECTION_KEY: `A valid POSTGRESQL_CONNECTION_KEY is required. 
                                  You can add one to your environment variables at 
                                  https://app.buildable.dev/settings/environment-variables. 
                                  You may also need to add a PostgreSQL Datasource to your project.`,
    NO_TABLE_NAME: "A valid tableName name is required.",
    INVALID_QUERY: "The query must be an object.",
    INVALID_PAGESIZE: "The pageSize must be a number.",
    INVALID_PAGE: "The page must be a number.",
    INVALID_SORT: "The sort must be an object.",
    INVALID_FIELDS: "The fields must be an array.",
  };

  if (!POSTGRESQL_CONNECTION_KEY) throw new Error(ERRORS.NO_POSTGRESQL_CONNECTION_KEY);
  if (!tableName || typeof tableName !== "string") throw new Error(ERRORS.NO_TABLE_NAME);
  if (query && typeof query !== "object") throw new Error(ERRORS.INVALID_QUERY);
  if (pageSize && typeof pageSize !== "number") throw new Error(ERRORS.INVALID_PAGESIZE);
  if (page && typeof page !== "number") throw new Error(ERRORS.INVALID_PAGE);
  if (sort && typeof sort !== "object") throw new Error(ERRORS.INVALID_SORT);
  if (fields && !Array.isArray(fields)) throw new Error(ERRORS.INVALID_FIELDS);
};
