/**
 * ----------------------------------------------------------------------------------------------------
 * Get Flow Events From Blocks [Run]
 *
 * @description - Get flow events from blocks using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/FlowGetBlockEvents
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
  const { TATUM_API_URL, TATUM_API_KEY, to, from, type } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `${TATUM_API_URL}/v3/flow/block/events`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: { to, from, type },
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, type, from, to }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
    INVALID_FROM: "A valid from field (number) was not provided in the input.",
    INVALID_TO: "A valid to field (number) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
  if (typeof from !== "number") throw new Error(ERRORS.INVALID_FROM);
  if (typeof to !== "number") throw new Error(ERRORS.INVALID_TO);
};
