/**
 * ----------------------------------------------------------------------------------------------------
 * Send Dogecoin to Blockchain Addresses [Run]
 *
 * @description - Send dogecoin to blockchain addresses using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/DogeTransferBlockchain
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
  const { TATUM_API_URL, TATUM_API_KEY, to, fromUTXO, changeAddress, fee } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/dogecoin/transaction`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: { to, fromUTXO, changeAddress, fee },
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, to, fromUTXO, changeAddress, fee }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (object) was not provided in the input.",
    INVALID_FROM_UTXO: "A valid fromUTXO field (object) was not provided in the input.",
    INVALID_CHANGE_ADDRESS: "A valid changeAddress field (string) was not provided in the input.",
    INVALID_FEE: "A valid fee field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof to !== "object") throw new Error(ERRORS.INVALID_TO);
  if (typeof fromUTXO !== "object") throw new Error(ERRORS.INVALID_FROM_UTXO);
  if (typeof changeAddress !== "string") throw new Error(ERRORS.INVALID_CHANGE_ADDRESS);
  if (typeof fee !== "string") throw new Error(ERRORS.INVALID_FEE);
};
