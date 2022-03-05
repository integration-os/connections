/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy ONE HRM20 Smart Contract to Blockchain and Ledger [Run]
 *
 * @description - Deploy one hrm20 smart contract to blockchain and ledger using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/OneDeployHrm20
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
    index,
    mnemonic,
    address,
    basePair,
    description,
    supply,
    symbol,
    shardID,
    baseRate,
    customer,
    nonce,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/offchain/one/hrm20/deploy`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: { ...(shardID ? { shardID } : {}) },
      data: {
        index,
        mnemonic,
        address,
        basePair,
        description,
        supply,
        symbol,
        ...(baseRate ? { baseRate } : {}),
        ...(customer ? { customer } : {}),
        ...(nonce ? { nonce } : {}),
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
const verifyInput = ({
  TATUM_API_KEY,
  TATUM_API_URL,
  index,
  mnemonic,
  address,
  basePair,
  description,
  supply,
  symbol,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_INDEX: "A valid index field (number) was not provided in the input.",
    INVALID_MNEMONIC: "A valid mnemonic field (string) was not provided in the input.",
    INVALID_ADDRESS: "A valid address field (string) was not provided in the input.",
    INVALID_BASE_PAIR: "A valid basePair field (string) was not provided in the input.",
    INVALID_DESCRIPTION: "A valid description field (string) was not provided in the input.",
    INVALID_SUPPLY: "A valid supply field (string) was not provided in the input.",
    INVALID_SYMBOL: "A valid symbol field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof index !== "number") throw new Error(ERRORS.INVALID_INDEX);
  if (typeof mnemonic !== "string") throw new Error(ERRORS.INVALID_MNEMONIC);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof basePair !== "string") throw new Error(ERRORS.INVALID_BASE_PAIR);
  if (typeof description !== "string") throw new Error(ERRORS.INVALID_DESCRIPTION);
  if (typeof supply !== "string") throw new Error(ERRORS.INVALID_SUPPLY);
  if (typeof symbol !== "string") throw new Error(ERRORS.INVALID_SYMBOL);
};
