/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy ERC20 Smart Contract. [Run]
 *
 * @description - Deploy erc20 smart contract. using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/Erc20Deploy
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
    address,
    digits,
    supply,
    name,
    symbol,
    chain,
    testnetType,
    totalCap,
    nonce,
    fee,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/blockchain/token/deploy`,
      headers: {
        "x-api-key": `${TATUM_API_KEY}`,
        ...(testnetType ? { "x-testnet-type": `${testnetType}` } : {}),
      },
      params: {},
      data: {
        fromPrivateKey,
        address,
        digits,
        supply,
        name,
        symbol,
        chain,
        ...(totalCap ? { totalCap } : {}),
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
  address,
  digits,
  supply,
  name,
  symbol,
  chain,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
    INVALID_ADDRESS: "A valid address field (string) was not provided in the input.",
    INVALID_DIGITS: "A valid digits field (number) was not provided in the input.",
    INVALID_SUPPLY: "A valid supply field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_SYMBOL: "A valid symbol field (string) was not provided in the input.",
    INVALID_CHAIN: "A valid chain field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromPrivateKey !== "string") throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof digits !== "number") throw new Error(ERRORS.INVALID_DIGITS);
  if (typeof supply !== "string") throw new Error(ERRORS.INVALID_SUPPLY);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof symbol !== "string") throw new Error(ERRORS.INVALID_SYMBOL);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
};
