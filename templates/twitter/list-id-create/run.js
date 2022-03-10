/**
 * ----------------------------------------------------------------------------------------------------
 * Create List [Run]
 *
 * @description - Create list using the Twitter API
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
  const { TWITTER_BEARER_TOKEN, name, description, private } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.twitter.com/2/lists",
      headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      data: {
        name,
        ...(description ? { description } : {}),
        ...(private ? { private } : {}),
      },
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
const verifyInput = ({ TWITTER_BEARER_TOKEN, name }) => {
  const ERRORS = {
    INVALID_TWITTER_BEARER_TOKEN:
      "A valid TWITTER_BEARER_TOKEN field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof TWITTER_BEARER_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_TWITTER_BEARER_TOKEN);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
