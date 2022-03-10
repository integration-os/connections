/**
 * ----------------------------------------------------------------------------------------------------
 * Send XDC / ERC20 From Account to Account [Run]
 *
 * @description - Send xdc / erc20 from account to account using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XdcBlockchainTransfer
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
    TATUM_API_KEY,
    TATUM_API_URL,
    currency,
    to,
    amount,
    fromPrivateKey,
    data,
    nonce,
    fee,
  } = input;

  verifyInput(input);

  try {
    const { data: _data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/xdc/transaction`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: {
        currency,
        to,
        amount,
        fromPrivateKey,
        ...(data ? { data } : {}),
        ...(nonce ? { nonce } : {}),
        ...(fee ? { fee } : {}),
      },
    });

    return _data;
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
  currency,
  to,
  amount,
  fromPrivateKey,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_CURRENCY:
      "A valid currency field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
    INVALID_AMOUNT:
      "A valid amount field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof fromPrivateKey !== "string")
    throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
};
