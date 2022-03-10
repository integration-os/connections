/**
 * ----------------------------------------------------------------------------------------------------
 * JSON RPC HTTP Driver [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BtcRpcDriver
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

    // jsonrpc: "1.0",
    // id: "test",
    // method: "getblockcount",
    // params: [],
  };
};
