/**
 * ----------------------------------------------------------------------------------------------------
 * Got Request [Run]
 *
 * @description - Perform an HTTP request to an external API endpoint using Got
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.npmjs.com/package/got
 *
 * ----------------------------------------------------------------------------------------------------
 */

const got = require("got");

/**
 * The Node's executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  verifyInput(input);

  try {
    const { body, headers } = await got(input);

    return body;
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
const verifyInput = ({ method, url }) => {
  const ERRORS = {
    INVALID_METHOD: "A valid method field (string) must be provided",
    INVALID_URL: "A valid url field (string) must be provided",
  };

  if (typeof method !== "string") throw new Error(ERRORS.INVALID_METHOD);
  if (typeof url !== "string") throw new Error(ERRORS.INVALID_URL);
};
