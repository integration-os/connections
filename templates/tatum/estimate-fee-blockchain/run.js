/**
 * ----------------------------------------------------------------------------------------------------
 * Estimate Fee for Transaction [Run]
 *
 * @description - Estimate fee for transaction using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EstimateFeeBlockchain
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
    chain,
    type,
    sender,
    recipient,
    contractAddress,
    amount,
    enableFungibleTokens,
    enableNonFungibleTokens,
    enableSemiFungibleTokens,
    enableBatchTransactions,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/blockchain/estimate`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: {
        chain,
        type,
        ...(sender ? { sender } : {}),
        ...(recipient ? { recipient } : {}),
        ...(contractAddress ? { contractAddress } : {}),
        ...(amount ? { amount } : {}),
        ...(enableFungibleTokens ? { enableFungibleTokens } : {}),
        ...(enableNonFungibleTokens ? { enableNonFungibleTokens } : {}),
        ...(enableSemiFungibleTokens ? { enableSemiFungibleTokens } : {}),
        ...(enableBatchTransactions ? { enableBatchTransactions } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, chain, type }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_CHAIN:
      "A valid chain field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
};
