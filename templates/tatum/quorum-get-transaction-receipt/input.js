/**
 * ----------------------------------------------------------------------------------------------------
 * Get Quorum Transaction Receipt [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/QuorumGetTransactionReceipt
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
    quorumEndpoint: "string", // Required
    TATUM_API_KEY: $trigger.env.TATUM_API_KEY, // Required
    TATUM_API_URL: $trigger.env.TATUM_API_URL, // Required
    hash: "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7", // Required
  };
};
