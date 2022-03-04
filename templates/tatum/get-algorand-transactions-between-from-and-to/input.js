/**
 * ----------------------------------------------------------------------------------------------------
 * Get Algorand Transactions Between From and To [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/AlgorandGetPayTransactionsByFromTo
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
    from: `2021-05-01T20:44:39Z`, // Required
    to: `2021-06-01T20:44:39Z`, // Required

    // limit: `5`,
    // next: `ywAAAAAAAAAAAAAA`,
  };
};
