/**
 * ----------------------------------------------------------------------------------------------------
 * JSON RPC HTTP Driver [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/SolanaWeb3Driver
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
    TATUM_API_URL: $trigger.env.TATUM_API_URL, // Required
    xApiKey: `asdlkfjnqunalkwjfnq2oi303294857k`, // Required
    id: 2, // Required
    params: [], // Required
    method: `getVersion`, // Required
    jsonrpc: `2.0`, // Required
  };
};
