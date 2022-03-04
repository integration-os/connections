/**
 * ----------------------------------------------------------------------------------------------------
 * Unblock an Amount in an Account and Perform a Transaction [Run]
 *
 * @description - Unblock an amount in an account and perform a transaction using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/unblockAmountWithTransaction
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
    amount,
    recipientAccountId,
    id,
    anonymous,
    compliant,
    transactionCode,
    paymentId,
    recipientNote,
    baseRate,
    senderNote,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `${TATUM_API_URL}/v3/ledger/account/block/${id}`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        amount,
        recipientAccountId,
        ...(anonymous ? { anonymous } : {}),
        ...(compliant ? { compliant } : {}),
        ...(transactionCode ? { transactionCode } : {}),
        ...(paymentId ? { paymentId } : {}),
        ...(recipientNote ? { recipientNote } : {}),
        ...(baseRate ? { baseRate } : {}),
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
const verifyInput = ({
  TATUM_API_KEY,
  TATUM_API_URL,
  id,
  amount,
  recipientAccountId,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_AMOUNT:
      "A valid amount field (string) was not provided in the input.",
    INVALID_RECIPIENT_ACCOUNT_ID:
      "A valid recipientAccountId field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof recipientAccountId !== "string")
    throw new Error(ERRORS.INVALID_RECIPIENT_ACCOUNT_ID);
};
