/**
 * ----------------------------------------------------------------------------------------------------
 * Space Lookup up Space IDs [Run]
 *
 * @description - Space Lookup up Space IDs using the Twitter v2 API
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
  const { TWITTER_BEARER_TOKEN, ids, spaceFields, expansions } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.twitter.com/2/spaces",
      auth: {},
      headers: { authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        ids,
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
const verifyInput = ({ ids }) => {
  const ERRORS = {
    INVALID_IDS: "A valid ids field (object) was not provided in the input.",
  };

  if (typeof ids !== "object") throw new Error(ERRORS.INVALID_IDS);
};
