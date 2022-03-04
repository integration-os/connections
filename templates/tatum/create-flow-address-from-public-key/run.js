/**
 * ----------------------------------------------------------------------------------------------------
 * Create Flow Address From Public Key [Run]
 *
 * @description - Create flow address from public key using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/FlowCreateAddressFromPubKey
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
  const { TATUM_API_URL, TATUM_API_KEY, index, mnemonic, publicKey, account, weight } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/flow/account`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        index,
        mnemonic,
        publicKey,
        account,
        ...(weight ? { weight } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, index, mnemonic, publicKey, account }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_INDEX: "A valid index field (number) was not provided in the input.",
    INVALID_MNEMONIC: "A valid mnemonic field (string) was not provided in the input.",
    INVALID_PUBLIC_KEY: "A valid publicKey field (string) was not provided in the input.",
    INVALID_ACCOUNT: "A valid account field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof index !== "number") throw new Error(ERRORS.INVALID_INDEX);
  if (typeof mnemonic !== "string") throw new Error(ERRORS.INVALID_MNEMONIC);
  if (typeof publicKey !== "string") throw new Error(ERRORS.INVALID_PUBLIC_KEY);
  if (typeof account !== "string") throw new Error(ERRORS.INVALID_ACCOUNT);
};
