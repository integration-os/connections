/**
 * ----------------------------------------------------------------------------------------------------
 * Find Transactions for Account. [Run]
 *
 * @description - Find transactions for account. using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/getTransactionsByAccountId
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
    id,
    pageSize,
    offset,
    count,
    counterAccount,
    from,
    to,
    currency,
    amount,
    currencies,
    transactionType,
    transactionTypes,
    opType,
    transactionCode,
    paymentId,
    recipientNote,
    senderNote,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/ledger/transaction/account`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {
        ...(pageSize ? { pageSize } : {}),
        ...(offset ? { offset } : {}),
        ...(count ? { count } : {}),
      },
      data: {
        id,
        ...(counterAccount ? { counterAccount } : {}),
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
        ...(currency ? { currency } : {}),
        ...(amount ? { amount } : {}),
        ...(currencies ? { currencies } : {}),
        ...(transactionType ? { transactionType } : {}),
        ...(transactionTypes ? { transactionTypes } : {}),
        ...(opType ? { opType } : {}),
        ...(transactionCode ? { transactionCode } : {}),
        ...(paymentId ? { paymentId } : {}),
        ...(recipientNote ? { recipientNote } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, id }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
};
