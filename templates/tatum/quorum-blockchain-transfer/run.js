/**
 * ----------------------------------------------------------------------------------------------------
 * Send Quorum Transaction [Run]
 *
 * @description - Send quorum transaction using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/QuorumBlockchainTransfer
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
    quorumEndpoint,
    from,
    to,
    data,
    nonce,
    amount,
  } = input;

  verifyInput(input);

  try {
    const { data: _data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/quorum/transaction`,
      headers: {
        "x-quorum-endpoint": quorumEndpoint,
        "x-api-key": TATUM_API_KEY,
      },
      data: {
        from,
        to,
        ...(data ? { data } : {}),
        ...(nonce ? { nonce } : {}),
        ...(amount ? { amount } : {}),
      },
    });

    return _data;
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
  quorumEndpoint,
  from,
  to,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_QUORUM_ENDPOINT:
      "A valid quorumEndpoint field (string) was not provided in the input.",
    INVALID_FROM: "A valid from field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof quorumEndpoint !== "string")
    throw new Error(ERRORS.INVALID_QUORUM_ENDPOINT);
  if (typeof from !== "string") throw new Error(ERRORS.INVALID_FROM);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
};
