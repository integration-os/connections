/**
 * ----------------------------------------------------------------------------------------------------
 * Axios Request [Run]
 *
 * @description - Perform an HTTP request to an external API endpoint using Axios
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://axios-http.com/docs/api_intro
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  verifyInput(input);

  try {
    const { data } = await axios(input);

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error?.response?.data,
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
