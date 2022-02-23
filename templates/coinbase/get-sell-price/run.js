/**
 * ----------------------------------------------------------------------------------------------------
 * Get Sell Price [Run]
 *
 * @description - Get the total price to sell one bitcoin or ether using the Coinbase API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.coinbase.com/api/v2#get-sell-price
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
  const { baseURL, currencyPair } = input;

  verifyInput(input);

  try {
    const result = await axios({
      url: `${baseURL}/prices/${currencyPair}/sell`,
    });

    return result.data;
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
const verifyInput = ({ baseURL, currencyPair }) => {
  const ERRORS = {
    INVALID_URL: "A valid baseURL field (string) was not provided in the input.",
    INVALID_CURRENCY_PAIR: "A valid currencyPair field (string) was not provided in the input.",
  };

  if (typeof baseURL !== "string") throw new Error(ERRORS.INVALID_URL);
  if (typeof currencyPair !== "string") throw new Error(ERRORS.INVALID_CURRENCY_PAIR);
};
