/**
 * ----------------------------------------------------------------------------------------------------
 * Space Lookup by Their Creators [Run]
 *
 * @description - Space Lookup by Their Creators using the Twitter v2 API
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
  const { TWITTER_BEARER_TOKEN, user_ids, spaceFields, expansions } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.twitter.com/2/spaces/by/creator_ids",
      auth: {},
      headers: { authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        user_ids,
        ...(spaceFields ? { "space.fields": spaceFields } : {}),
        ...(expansions ? { expansions } : {}),
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
const verifyInput = ({ user_ids }) => {
  const ERRORS = {
    INVALID_USER_IDS: "A valid user_ids field (object) was not provided in the input.",
  };

  if (typeof user_ids !== "object") throw new Error(ERRORS.INVALID_USER_IDS);
};
