/**
 * ----------------------------------------------------------------------------------------------------
 * Store Withdrawal [Run]
 *
 * @description - Store withdrawal using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/storeWithdrawal
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
    fee,
    amount,
    address,
    senderAccountId,
    attr,
    compliant,
    multipleAmounts,
    paymentId,
    senderNote,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/offchain/withdrawal`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        fee,
        amount,
        address,
        senderAccountId,
        ...(attr ? { attr } : {}),
        ...(compliant ? { compliant } : {}),
        ...(multipleAmounts ? { multipleAmounts } : {}),
        ...(paymentId ? { paymentId } : {}),
        ...(senderNote ? { senderNote } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, fee, amount, address, senderAccountId }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FEE: "A valid fee field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
    INVALID_ADDRESS: "A valid address field (string) was not provided in the input.",
    INVALID_SENDER_ACCOUNT_ID:
      "A valid senderAccountId field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fee !== "string") throw new Error(ERRORS.INVALID_FEE);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof senderAccountId !== "string") throw new Error(ERRORS.INVALID_SENDER_ACCOUNT_ID);
};
