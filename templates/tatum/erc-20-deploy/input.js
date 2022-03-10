/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy ERC20 Smart Contract. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/Erc20Deploy
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
    chain: "ETH", // Required
    symbol: "ERC_SYMBOL", // Required
    name: "MyERC20", // Required
    supply: "10000000", // Required
    digits: 18, // Required
    address: "0xa0Ca9FF38Bad06eBe64f0fDfF279cAE35129F5C6", // Required
    fromPrivateKey:
      "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2", // Required

    // testnetType: "ethereum-ropsten",
    // totalCap: "10000000",
    // nonce: 0,
    // fee: { gasLimit: "40000", gasPrice: "20" },
  };
};
