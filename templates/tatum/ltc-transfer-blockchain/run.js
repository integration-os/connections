/**
 * ----------------------------------------------------------------------------------------------------
 * Send Litecoin to Blockchain Addresses [Run]
 *
 * @description - Send litecoin to blockchain addresses using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/LtcTransferBlockchain
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
  const { TATUM_API_KEY, TATUM_API_URL, fromAddress, to } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/litecoin/transaction`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: { fromAddress, to },
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, fromAddress, to }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_ADDRESS:
      "A valid fromAddress field (object) was not provided in the input.",
    INVALID_TO: "A valid to field (object) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromAddress !== "object")
    throw new Error(ERRORS.INVALID_FROM_ADDRESS);
  if (typeof to !== "object") throw new Error(ERRORS.INVALID_TO);
};
