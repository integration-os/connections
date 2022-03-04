/**
 * ----------------------------------------------------------------------------------------------------
 * Approve Transfer of Assets From Custodial Wallet [Run]
 *
 * @description - Approve transfer of assets from custodial wallet using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/ApproveTransferCustodialWallet
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
    spender,
    contractType,
    custodialAddress,
    chain,
    tokenAddress,
    amount,
    tokenId,
    nonce,
    fee,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/blockchain/sc/custodial/approve`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        fromPrivateKey,
        spender,
        contractType,
        custodialAddress,
        chain,
        ...(tokenAddress ? { tokenAddress } : {}),
        ...(amount ? { amount } : {}),
        ...(tokenId ? { tokenId } : {}),
        ...(nonce ? { nonce } : {}),
        ...(fee ? { fee } : {}),
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
  fromPrivateKey,
  spender,
  contractType,
  custodialAddress,
  chain,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
    INVALID_SPENDER: "A valid spender field (string) was not provided in the input.",
    INVALID_CONTRACT_TYPE: "A valid contractType field (number) was not provided in the input.",
    INVALID_CUSTODIAL_ADDRESS:
      "A valid custodialAddress field (string) was not provided in the input.",
    INVALID_CHAIN: "A valid chain field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromPrivateKey !== "string") throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
  if (typeof spender !== "string") throw new Error(ERRORS.INVALID_SPENDER);
  if (typeof contractType !== "number") throw new Error(ERRORS.INVALID_CONTRACT_TYPE);
  if (typeof custodialAddress !== "string") throw new Error(ERRORS.INVALID_CUSTODIAL_ADDRESS);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
};
