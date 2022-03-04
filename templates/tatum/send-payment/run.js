/**
 * ----------------------------------------------------------------------------------------------------
 * Send Payment [Run]
 *
 * @description - Send payment using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/sendTransaction
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
    senderAccountId,
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
      method: "post",
      url: `${TATUM_API_URL}/v3/ledger/transaction`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        amount,
        recipientAccountId,
        senderAccountId,
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
  amount,
  recipientAccountId,
  senderAccountId,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
    INVALID_RECIPIENT_ACCOUNT_ID:
      "A valid recipientAccountId field (string) was not provided in the input.",
    INVALID_SENDER_ACCOUNT_ID:
      "A valid senderAccountId field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof recipientAccountId !== "string") throw new Error(ERRORS.INVALID_RECIPIENT_ACCOUNT_ID);
  if (typeof senderAccountId !== "string") throw new Error(ERRORS.INVALID_SENDER_ACCOUNT_ID);
};
