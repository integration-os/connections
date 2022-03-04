/**
 * ----------------------------------------------------------------------------------------------------
 * Create New Virtual Currency [Run]
 *
 * @description - Create new virtual currency using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/createCurrency
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
    basePair,
    supply,
    name,
    baseRate,
    customer,
    description,
    accountCode,
    accountNumber,
    accountingCurrency,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/ledger/virtualCurrency`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        basePair,
        supply,
        name,
        ...(baseRate ? { baseRate } : {}),
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(accountCode ? { accountCode } : {}),
        ...(accountNumber ? { accountNumber } : {}),
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
  basePair,
  supply,
  name,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_BASE_PAIR:
      "A valid basePair field (string) was not provided in the input.",
    INVALID_SUPPLY:
      "A valid supply field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof basePair !== "string") throw new Error(ERRORS.INVALID_BASE_PAIR);
  if (typeof supply !== "string") throw new Error(ERRORS.INVALID_SUPPLY);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
