/**
 * ----------------------------------------------------------------------------------------------------
 * List All Historical Trades [Run]
 *
 * @description - List all historical trades using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/getHistoricalTradesBody
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
    pageSize,
    id,
    customerId,
    offset,
    pair,
    count,
    types,
    amount,
    fill,
    price,
    created,
    sort,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/trade/history`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        pageSize,
        ...(id ? { id } : {}),
        ...(customerId ? { customerId } : {}),
        ...(offset ? { offset } : {}),
        ...(pair ? { pair } : {}),
        ...(count ? { count } : {}),
        ...(types ? { types } : {}),
        ...(amount ? { amount } : {}),
        ...(fill ? { fill } : {}),
        ...(price ? { price } : {}),
        ...(created ? { created } : {}),
        ...(sort ? { sort } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, pageSize }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_PAGE_SIZE:
      "A valid pageSize field (number) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof pageSize !== "number") throw new Error(ERRORS.INVALID_PAGE_SIZE);
};
