/**
 * ----------------------------------------------------------------------------------------------------
 * Rules Lookup [Run]
 *
 * @description - Rules lookup using the Twitter API
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
  const { TWITTER_BEARER_TOKEN, ids, max_results, pagination_token } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.twitter.com/2/tweets/search/stream/rules",
      headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        ...(ids ? { ids } : {}),
        ...(max_results ? { max_results } : {}),
        ...(pagination_token ? { pagination_token } : {}),
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
const verifyInput = ({ TWITTER_BEARER_TOKEN }) => {
  const ERRORS = {
    INVALID_TWITTER_BEARER_TOKEN:
      "A valid TWITTER_BEARER_TOKEN field (string) was not provided in the input.",
  };

  if (typeof TWITTER_BEARER_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_TWITTER_BEARER_TOKEN);
};
