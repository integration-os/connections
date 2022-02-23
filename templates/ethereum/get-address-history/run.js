/**
 * ----------------------------------------------------------------------------------------------------
 * Get Balance [Run]
 *
 * @description - Get the ETH balance of an Ethereum address using ethersJS
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.ethers.io/v5/
 *
 * ----------------------------------------------------------------------------------------------------
 */

const ethers = require("ethers");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { network, address } = input;

  verifyInput(input);

  try {
    const provider = new ethers.providers.EtherscanProvider(network);
    const history = await provider.getHistory(address);

    return history;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ network, address }) => {
  const ERRORS = {
    NO_NETWORK: "No network was provided in the input.",
    NO_ADDRESS: "No address was provided in the input.",
  };

  if (typeof network === "undefined") throw new Error(ERRORS.NO_NETWORK);
  if (typeof address === "undefined") throw new Error(ERRORS.NO_ADDRESS);
};
