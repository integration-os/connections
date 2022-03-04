/**
 * ----------------------------------------------------------------------------------------------------
 * Burn Multi Token Batch [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BurnMultiTokenBatch
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
    contractAddress: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    amounts: ["10", "10"], // Required
    tokenId: ["1000", "1001"], // Required
    account: `0x4b812a77b109A150C2Fc89eD133EaBC78bC9EC8f`, // Required
    chain: `ETH`, // Required

    // testnetType: `ethereum-ropsten`,
    // data: `0x1234`,
    // nonce: 0,
    // fee: {"gasLimit":"40000","gasPrice":"20"},
  };
};
