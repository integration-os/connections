/**
 * ----------------------------------------------------------------------------------------------------
 * Send Litecoin From Tatum Account to Address [Run]
 *
 * @description - Send litecoin from tatum account to address using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/LtcTransfer
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
    mnemonic,
    xpub,
    compliant,
    fee,
    multipleAmounts,
    attr,
    paymentId,
    senderNote,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/offchain/litecoin/transfer`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: {
        senderAccountId,
        address,
        amount,
        mnemonic,
        xpub,
        ...(compliant ? { compliant } : {}),
        ...(fee ? { fee } : {}),
        ...(multipleAmounts ? { multipleAmounts } : {}),
        ...(attr ? { attr } : {}),
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
  mnemonic,
  xpub,
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
    INVALID_MNEMONIC:
      "A valid mnemonic field (string) was not provided in the input.",
    INVALID_XPUB: "A valid xpub field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof senderAccountId !== "string")
    throw new Error(ERRORS.INVALID_SENDER_ACCOUNT_ID);
  if (typeof address !== "string") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof mnemonic !== "string") throw new Error(ERRORS.INVALID_MNEMONIC);
  if (typeof xpub !== "string") throw new Error(ERRORS.INVALID_XPUB);
};
