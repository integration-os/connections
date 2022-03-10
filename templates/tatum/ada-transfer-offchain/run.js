/**
 * ----------------------------------------------------------------------------------------------------
 * Send ADA From Tatum Ledger to Blockchain [Run]
 *
 * @description - Send ada from tatum ledger to blockchain using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/AdaTransferOffchain
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
    senderAccountId,
    address,
    amount,
    compliant,
    fee,
    keyPair,
    attr,
    mnemonic,
    signatureId,
    xpub,
    paymentId,
    senderNote,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/offchain/ada/transfer`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: {
        senderAccountId,
        address,
        amount,
        ...(compliant ? { compliant } : {}),
        ...(fee ? { fee } : {}),
        ...(keyPair ? { keyPair } : {}),
        ...(attr ? { attr } : {}),
        ...(mnemonic ? { mnemonic } : {}),
        ...(signatureId ? { signatureId } : {}),
        ...(xpub ? { xpub } : {}),
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
const verifyInput = ({
  TATUM_API_KEY,
  TATUM_API_URL,
  senderAccountId,
  address,
  amount,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_SENDER_ACCOUNT_ID:
      "A valid senderAccountId field (string) was not provided in the input.",
    INVALID_ADDRESS:
      "A valid address field (string) was not provided in the input.",
    INVALID_AMOUNT:
      "A valid amount field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof senderAccountId !== "string")
    throw new Error(ERRORS.INVALID_SENDER_ACCOUNT_ID);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
};
