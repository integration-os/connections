/**
 * ----------------------------------------------------------------------------------------------------
 * Create NFT Marketplace [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GenerateMarketplace
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
    fromPrivateKey: `0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2`, // Required
    marketplaceFee: 150, // Required
    feeRecipient: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    chain: `ETH`, // Required

    // nonce: 1,
    // fee: {"gasLimit":"40000","gasPrice":"20"},
  };
};
