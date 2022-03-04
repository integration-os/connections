/**
 * ----------------------------------------------------------------------------------------------------
 * Register New Token in the Ledger [Run]
 *
 * @description - Register new token in the ledger using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/registerErc20Token
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
    xpub,
    derivationIndex,
    basePair,
    description,
    decimals,
    supply,
    symbol,
    chain,
    baseRate,
    customer,
    accountingCurrency,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/offchain/token/${chain}`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        xpub,
        derivationIndex,
        basePair,
        description,
        decimals,
        supply,
        symbol,
        ...(baseRate ? { baseRate } : {}),
        ...(customer ? { customer } : {}),
        ...(accountingCurrency ? { accountingCurrency } : {}),
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
  chain,
  xpub,
  derivationIndex,
  basePair,
  description,
  decimals,
  supply,
  symbol,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_CHAIN: "A valid chain field (string) was not provided in the input.",
    INVALID_XPUB: "A valid xpub field (string) was not provided in the input.",
    INVALID_DERIVATION_INDEX:
      "A valid derivationIndex field (number) was not provided in the input.",
    INVALID_BASE_PAIR: "A valid basePair field (string) was not provided in the input.",
    INVALID_DESCRIPTION: "A valid description field (string) was not provided in the input.",
    INVALID_DECIMALS: "A valid decimals field (number) was not provided in the input.",
    INVALID_SUPPLY: "A valid supply field (string) was not provided in the input.",
    INVALID_SYMBOL: "A valid symbol field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
  if (typeof xpub !== "string") throw new Error(ERRORS.INVALID_XPUB);
  if (typeof derivationIndex !== "number") throw new Error(ERRORS.INVALID_DERIVATION_INDEX);
  if (typeof basePair !== "string") throw new Error(ERRORS.INVALID_BASE_PAIR);
  if (typeof description !== "string") throw new Error(ERRORS.INVALID_DESCRIPTION);
  if (typeof decimals !== "number") throw new Error(ERRORS.INVALID_DECIMALS);
  if (typeof supply !== "string") throw new Error(ERRORS.INVALID_SUPPLY);
  if (typeof symbol !== "string") throw new Error(ERRORS.INVALID_SYMBOL);
};
