/**
 * ----------------------------------------------------------------------------------------------------
 * Get Polygon Transactions by Address [Run]
 *
 * @description - Get polygon transactions by address using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/PolygonGetTransactionByAddress
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
    address,
    pageSize,
    offset,
    from,
    to,
    sort,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `${TATUM_API_URL}/v3/polygon/account/transaction/${address}`,
      headers: { "x-api-key": TATUM_API_KEY },
      params: {
        pageSize,
        ...(offset ? { offset } : {}),
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, address, pageSize }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_ADDRESS:
      "A valid address field (string) was not provided in the input.",
    INVALID_PAGE_SIZE:
      "A valid pageSize field (number) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof pageSize !== "number") throw new Error(ERRORS.INVALID_PAGE_SIZE);
};
