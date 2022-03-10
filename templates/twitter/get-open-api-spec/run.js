/**
 * ----------------------------------------------------------------------------------------------------
 * Returns the Open Api Spec Document. [Run]
 *
 * @description - Returns the open api spec document. using the Twitter API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
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
  const {} = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.twitter.com/2/openapi.json",
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({}) => {
  const ERRORS = {};
};
