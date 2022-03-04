/**
 * ----------------------------------------------------------------------------------------------------
 * Node HTTP Driver [Run]
 *
 * @description - Node http driver using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EgldNodeGet
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
  const { TATUM_API_URL, xApiKey } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `${TATUM_API_URL}/v3/egld/node/${xApiKey}/*`,
      headers: {},
      params: {},
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
const verifyInput = ({ TATUM_API_URL, xApiKey }) => {
  const ERRORS = {
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_X_API_KEY: "A valid xApiKey field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof xApiKey !== "string") throw new Error(ERRORS.INVALID_X_API_KEY);
};
