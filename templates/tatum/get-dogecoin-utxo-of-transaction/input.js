/**
 * ----------------------------------------------------------------------------------------------------
 * Get Dogecoin UTXO of Transaction [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/DogeGetUTXO
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
    hash: `5f83d51c8d3054012cea3011fa626b85d89442788721afd60719ab1f9ab8f78a`, // Required
    index: 0, // Required
  };
};
