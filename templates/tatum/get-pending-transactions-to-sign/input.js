/**
 * ----------------------------------------------------------------------------------------------------
 * Get Pending Transactions to Sign [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GetPendingTransactionsToSign
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
    chain: "BNB", // Required

    // signatures:
    //     "6d78dad2-518f-4e76-8255-8f1df0de6884,6d78dad2-518f-4e76-8255-8f1df0de6885,6d78dad2-518f-4e76-8255-8f1df0de6886",
  };
};
