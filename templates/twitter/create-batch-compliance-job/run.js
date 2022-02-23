/**
 * ----------------------------------------------------------------------------------------------------
 * Create Compliance Job [Run]
 *
 * @description - Create Compliance Job using the Twitter v2 API
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
  const { TWITTER_BEARER_TOKEN, type, resumable, name } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.twitter.com/2/compliance/jobs",
      auth: {},
      headers: { authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {},
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
      data: {
        type,
        ...(resumable ? { resumable } : {}),
        ...(name ? { name } : {}),
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
const verifyInput = ({ type }) => {
  const ERRORS = {
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
  };

  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
};
