/**
 * ----------------------------------------------------------------------------------------------------
 * Get Exchange Rates [Run]
 *
 * @description - Get current exchange rates using the Coinbase API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.coinbase.com/api/v2#get-exchange-rates
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
  const { baseURL, currency } = input;

  verifyInput(input);

  try {
    const result = await axios({
      url: `${baseURL}/exchange-rates`,
      params: {
        ...(currency ? { currency } : {}),
      },
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
const verifyInput = ({ baseURL }) => {
  const ERRORS = {
    INVALID_URL: "A valid baseURL field (string) was not provided in the input.",
  };

  if (typeof baseURL !== "string") throw new Error(ERRORS.INVALID_URL);
};
