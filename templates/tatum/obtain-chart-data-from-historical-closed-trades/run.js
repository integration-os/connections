/**
 * ----------------------------------------------------------------------------------------------------
 * Obtain Chart Data From Historical Closed Trades [Run]
 *
 * @description - Obtain chart data from historical closed trades using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/chartRequest
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
  const { TATUM_API_URL, TATUM_API_KEY, timeFrame, to, from, pair } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/trade/chart`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: { timeFrame, to, from, pair },
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, timeFrame, to, from, pair }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_TIME_FRAME: "A valid timeFrame field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (number) was not provided in the input.",
    INVALID_FROM: "A valid from field (number) was not provided in the input.",
    INVALID_PAIR: "A valid pair field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof timeFrame !== "string") throw new Error(ERRORS.INVALID_TIME_FRAME);
  if (typeof to !== "number") throw new Error(ERRORS.INVALID_TO);
  if (typeof from !== "number") throw new Error(ERRORS.INVALID_FROM);
  if (typeof pair !== "string") throw new Error(ERRORS.INVALID_PAIR);
};
