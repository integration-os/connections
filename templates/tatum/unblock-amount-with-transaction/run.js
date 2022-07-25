const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_TATUM_API_KEY,
    BUILDABLE_TATUM_API_URL,
    id,
    recipientAccountId,
    amount,
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
      url: `{TATUM_API_URL}/v3/ledger/account/block/${id}`,
      headers: { "x-api-key": BUILDABLE_TATUM_API_KEY },
      data: {
        recipientAccountId,
        amount,
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
  BUILDABLE_TATUM_API_KEY,
  BUILDABLE_TATUM_API_URL,
  id,
  recipientAccountId,
  amount,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_TATUM_API_KEY:
      "A valid BUILDABLE_TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_BUILDABLE_TATUM_API_URL:
      "A valid BUILDABLE_TATUM_API_URL field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_RECIPIENT_ACCOUNT_ID:
      "A valid recipientAccountId field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_TATUM_API_KEY);
  if (typeof BUILDABLE_TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_TATUM_API_URL);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof recipientAccountId !== "string") throw new Error(ERRORS.INVALID_RECIPIENT_ACCOUNT_ID);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
};
