/**
 * ----------------------------------------------------------------------------------------------------
 * Get Transactions by Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GetScryptaTransactionsbyaddress
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
    pageSize: 50, // Required
    offset: 100, // Required
    address: `LPcLKgbdwmDkdNFYfv1VX1k3gUuQgS7Au6`, // Required
  };
};
