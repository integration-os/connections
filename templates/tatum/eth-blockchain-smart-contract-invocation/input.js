/**
 * ----------------------------------------------------------------------------------------------------
 * Invoke Smart Contract Method [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EthBlockchainSmartContractInvocation
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    TATUM_API_KEY: $trigger.env.TATUM_API_KEY, // Required
    TATUM_API_URL: $trigger.env.TATUM_API_URL, // Required
    contractAddress: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85", // Required
    methodName: "transfer", // Required
    methodABI: {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    }, // Required
    params: ["0x632"], // Required
    fromPrivateKey:
      "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2", // Required

    // testnetType: "ethereum-ropsten",
    // amount: "100000",
    // nonce: 0,
    // fee: { gasLimit: "40000", gasPrice: "20" },
  };
};
