/**
 * ----------------------------------------------------------------------------------------------------
 * Create Tron TRC20 Token [Run]
 *
 * @description - Create tron trc20 token using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TronCreateTrc20
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
  const {
    TATUM_API_URL,
    TATUM_API_KEY,
    decimals,
    totalSupply,
    symbol,
    name,
    recipient,
    fromPrivateKey,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/tron/trc20/deploy`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: { decimals, totalSupply, symbol, name, recipient, fromPrivateKey },
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
  TATUM_API_KEY,
  TATUM_API_URL,
  decimals,
  totalSupply,
  symbol,
  name,
  recipient,
  fromPrivateKey,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_DECIMALS:
      "A valid decimals field (number) was not provided in the input.",
    INVALID_TOTAL_SUPPLY:
      "A valid totalSupply field (number) was not provided in the input.",
    INVALID_SYMBOL:
      "A valid symbol field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_RECIPIENT:
      "A valid recipient field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof decimals !== "number") throw new Error(ERRORS.INVALID_DECIMALS);
  if (typeof totalSupply !== "number")
    throw new Error(ERRORS.INVALID_TOTAL_SUPPLY);
  if (typeof symbol !== "string") throw new Error(ERRORS.INVALID_SYMBOL);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof recipient !== "string") throw new Error(ERRORS.INVALID_RECIPIENT);
  if (typeof fromPrivateKey !== "string")
    throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
};
