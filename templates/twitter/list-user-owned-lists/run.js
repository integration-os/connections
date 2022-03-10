/**
 * ----------------------------------------------------------------------------------------------------
 * Get a User's Owned Lists [Run]
 *
 * @description - Get a user's owned lists using the Twitter API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWITTER_BEARER_TOKEN,
    id,
    max_results,
    pagination_token,
    listFields,
    expansions,
    userFields,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.twitter.com/2/users/${id}/owned_lists`,
      headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        ...(max_results ? { max_results } : {}),
        ...(pagination_token ? { pagination_token } : {}),
        ...(listFields ? { "list.fields": listFields } : {}),
        ...(expansions ? { expansions } : {}),
        ...(userFields ? { "user.fields": userFields } : {}),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
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
const verifyInput = ({ TWITTER_BEARER_TOKEN, id }) => {
  const ERRORS = {
    INVALID_TWITTER_BEARER_TOKEN:
      "A valid TWITTER_BEARER_TOKEN field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
  };

  if (typeof TWITTER_BEARER_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_TWITTER_BEARER_TOKEN);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
};
