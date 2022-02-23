/**
 * ----------------------------------------------------------------------------------------------------
 * Add/Delete Rules [Run]
 *
 * @description - Add/Delete Rules using the Twitter v2 API
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
  const { TWITTER_BEARER_TOKEN, dry_run } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.twitter.com/2/tweets/search/stream/rules",
      auth: {},
      headers: { authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: { ...(dry_run ? { dry_run } : {}) },
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
const verifyInput = () => {
  const ERRORS = {};
};
