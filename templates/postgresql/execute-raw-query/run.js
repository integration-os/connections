const { getConnection } = require("@buildable/knex");

const run = async (input) => {
  const { POSTGRESQL_CONNECTION_KEY, maxLimit } = input;
  let { query } = input;

  verifyInput(input);

  query = handleLimit(query, maxLimit);

  try {
    const db = await getConnection(POSTGRESQL_CONNECTION_KEY);

    return db.raw(query);
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

const verifyInput = ({ POSTGRESQL_CONNECTION_KEY, query, maxLimit }) => {
  const ERRORS = {
    NO_POSTGRESQL_CONNECTION_KEY: "A valid POSTGRESQL_CONNECTION_KEY is required. Create your appropriate Database to automatically add it.",
    INVALID_QUERY: "The query must be a string.",
    INVALID_MAX_LIMIT: "The maxLimit must be a number.",
  };

  if (!POSTGRESQL_CONNECTION_KEY) throw new Error(ERRORS.NO_POSTGRESQL_CONNECTION_KEY);
  if (typeof query !== "string") throw new Error(ERRORS.INVALID_QUERY);
  if (typeof maxLimit !== "number") throw new Error(ERRORS.INVALID_MAX_LIMIT);
};

const handleLimit = (query, maxLimit) => {
  if(maxLimit > 200) {
  throw new Error("The optimized value for maxLimit is less than or equal to 200")
  }

  const splitQuery = query.split(";")

  splitQuery.forEach((q, i) => {
    if(q.trim().toLowerCase().substring(0, "select".length) === "select") {
      splitQuery[i] = setHardLimit(q.trim(), maxLimit)
    }
  })

  return splitQuery.join("; ")
}

const setHardLimit = (query, maxLimit) => {
  if(query.charAt(query.length - 1) === ";") {
    query = query.substring(0, query.length - 1)
  }

  const tokenizedQuery = query.split(" ");
  const foundIndex = Math.max(tokenizedQuery.lastIndexOf("limit"), tokenizedQuery.lastIndexOf("LIMIT"));
  if(foundIndex > 0) {
    const limit = tokenizedQuery[foundIndex + 1]
    if(Number.parseInt(limit) > maxLimit) {
      tokenizedQuery[foundIndex + 1] = maxLimit + limit.toString().substring(Number.parseInt(limit).toString().length) //handle parsing with parenthesis or semi colons
    }
  } else {
    tokenizedQuery.push("LIMIT")
    tokenizedQuery.push(maxLimit)
  }

  return tokenizedQuery.join(" ")
}
