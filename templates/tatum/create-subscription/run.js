/**
 * ----------------------------------------------------------------------------------------------------
 * Create New Subscription [Run]
 *
 * @description - Create new subscription using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/createSubscription
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
  const { TATUM_API_KEY, TATUM_API_URL, type, attr } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/subscription`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: { type, attr },
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, type, attr }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
    INVALID_ATTR: "A valid attr field (object) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
  if (typeof attr !== "object") throw new Error(ERRORS.INVALID_ATTR);
};
