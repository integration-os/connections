/**
 * ----------------------------------------------------------------------------------------------------
 * Create Tron TRC20 Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TronCreateTrc20
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
    decimals: 10, // Required
    totalSupply: 100000, // Required
    symbol: `SYM`, // Required
    name: `My token`, // Required
    recipient: `TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh`, // Required
    fromPrivateKey: `842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701`, // Required
  };
};
