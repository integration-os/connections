/**
 * ----------------------------------------------------------------------------------------------------
 * Get UTXO of Transaction [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BtcGetUTXO
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
    hash: "53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc", // Required
    index: 0, // Required
  };
};
