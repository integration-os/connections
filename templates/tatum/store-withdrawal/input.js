/**
 * ----------------------------------------------------------------------------------------------------
 * Store Withdrawal [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/storeWithdrawal
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
    fee: `0.0005`, // Required
    amount: `0.001`, // Required
    address: `mpTwPdF8up9kidgcAStriUPwRdnE9MRAg7`, // Required
    senderAccountId: `5e68c66581f2ee32bc354087`, // Required

    // attr: `12345`,
    // compliant: false,
    // multipleAmounts: ["0.1"],
    // paymentId: `12345`,
    // senderNote: `Sender note`,
  };
};
