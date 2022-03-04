/**
 * ----------------------------------------------------------------------------------------------------
 * Send Binance / Binance Token From Account to Account [Run]
 *
 * @description - Send binance / binance token from account to account using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BnbBlockchainTransfer
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
  const { TATUM_API_URL, TATUM_API_KEY, fromPrivateKey, amount, currency, to, message } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/bnb/transaction`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        fromPrivateKey,
        amount,
        currency,
        to,
        ...(message ? { message } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, fromPrivateKey, amount, currency, to }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromPrivateKey !== "string") throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
};
