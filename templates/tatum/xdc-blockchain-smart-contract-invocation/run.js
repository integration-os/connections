/**
 * ----------------------------------------------------------------------------------------------------
 * Invoke Smart Contract Method [Run]
 *
 * @description - Invoke smart contract method using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XdcBlockchainSmartContractInvocation
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
    contractAddress,
    methodName,
    methodABI,
    params,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/xdc/smartcontract`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: { contractAddress, methodName, methodABI, params },
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
  contractAddress,
  methodName,
  methodABI,
  params,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_CONTRACT_ADDRESS:
      "A valid contractAddress field (string) was not provided in the input.",
    INVALID_METHOD_NAME:
      "A valid methodName field (string) was not provided in the input.",
    INVALID_METHOD_ABI:
      "A valid methodABI field (object) was not provided in the input.",
    INVALID_PARAMS:
      "A valid params field (object) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof contractAddress !== "string")
    throw new Error(ERRORS.INVALID_CONTRACT_ADDRESS);
  if (typeof methodName !== "string")
    throw new Error(ERRORS.INVALID_METHOD_NAME);
  if (typeof methodABI !== "object") throw new Error(ERRORS.INVALID_METHOD_ABI);
  if (typeof params !== "object") throw new Error(ERRORS.INVALID_PARAMS);
};
