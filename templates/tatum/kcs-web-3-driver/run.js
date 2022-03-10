/**
 * ----------------------------------------------------------------------------------------------------
 * Web3 HTTP Driver [Run]
 *
 * @description - Web3 http driver using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/KcsWeb3Driver
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
  const { TATUM_API_URL, xApiKey, jsonrpc, method, params, id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/kcs/web3/${xApiKey}`,
      data: { jsonrpc, method, params, id },
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
const verifyInput = ({
  TATUM_API_URL,
  xApiKey,
  jsonrpc,
  method,
  params,
  id,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_X_API_KEY:
      "A valid xApiKey field (string) was not provided in the input.",
    INVALID_JSONRPC:
      "A valid jsonrpc field (string) was not provided in the input.",
    INVALID_METHOD:
      "A valid method field (string) was not provided in the input.",
    INVALID_PARAMS:
      "A valid params field (object) was not provided in the input.",
    INVALID_ID: "A valid id field (number) was not provided in the input.",
  };

  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof xApiKey !== "string") throw new Error(ERRORS.INVALID_X_API_KEY);
  if (typeof jsonrpc !== "string") throw new Error(ERRORS.INVALID_JSONRPC);
  if (typeof method !== "string") throw new Error(ERRORS.INVALID_METHOD);
  if (typeof params !== "object") throw new Error(ERRORS.INVALID_PARAMS);
  if (typeof id !== "number") throw new Error(ERRORS.INVALID_ID);
};
