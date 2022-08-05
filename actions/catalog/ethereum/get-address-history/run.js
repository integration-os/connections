const ethers = require("ethers");

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
