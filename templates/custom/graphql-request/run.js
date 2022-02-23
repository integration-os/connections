/**
 * ----------------------------------------------------------------------------------------------------
 * GraphQL Request [Run]
 *
 * @description - Perform a request using GraphQL
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.npmjs.com/package/graphql-request
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { request } = require("graphql-request");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { endpoint, query, variables = {}, requestHeaders = {} } = input;

  verifyInput(input);

  try {
    const data = await request(endpoint, query, variables, requestHeaders);

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ endpoint, query }) => {
  const ERRORS = {
    INVALID_ENDPOINT: "A valid endpoint field (string) must be provided",
    INVALID_QUERY: "A valid query field (string) must be provided",
  };

  if (typeof endpoint !== "string") throw new Error(ERRORS.INVALID_ENDPOINT);
  if (typeof query !== "string") throw new Error(ERRORS.INVALID_QUERY);
};
