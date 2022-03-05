/**
 * ----------------------------------------------------------------------------------------------------
 * Get Multi Tokens by Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/MultiTokenGetAddressBalance
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
    chain: `ETH`, // Required
    address: `0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B`, // Required

    // testnetType: `ethereum-ropsten`,
  };
};
