/**
 * ----------------------------------------------------------------------------------------------------
 * Transfer Multi Token Batch [Run]
 *
 * @description - Transfer multi token batch using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TransferMultiTokenBatch
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
    fromPrivateKey,
    contractAddress,
    amounts,
    tokenId,
    to,
    chain,
    testnetType,
    data,
    nonce,
    fee,
  } = input;

  verifyInput(input);

  try {
    const { data: _data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/multitoken/transaction/batch`,
      headers: {
        "x-api-key": `${TATUM_API_KEY}`,
        ...(testnetType ? { "x-testnet-type": `${testnetType}` } : {}),
      },
      params: {},
      data: {
        fromPrivateKey,
        contractAddress,
        amounts,
        tokenId,
        to,
        chain,
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
  fromPrivateKey,
  contractAddress,
  amounts,
  tokenId,
  to,
  chain,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
    INVALID_CONTRACT_ADDRESS:
      "A valid contractAddress field (string) was not provided in the input.",
    INVALID_AMOUNTS: "A valid amounts field (object) was not provided in the input.",
    INVALID_TOKEN_ID: "A valid tokenId field (object) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
    INVALID_CHAIN: "A valid chain field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromPrivateKey !== "string") throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
  if (typeof contractAddress !== "string") throw new Error(ERRORS.INVALID_CONTRACT_ADDRESS);
  if (typeof amounts !== "object") throw new Error(ERRORS.INVALID_AMOUNTS);
  if (typeof tokenId !== "object") throw new Error(ERRORS.INVALID_TOKEN_ID);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
};
