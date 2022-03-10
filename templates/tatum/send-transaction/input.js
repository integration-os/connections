/**
 * ----------------------------------------------------------------------------------------------------
 * Send Payment [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/sendTransaction
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
    senderAccountId: "5e6645712b55823de7ea82f1", // Required
    recipientAccountId: "5e6645712b55823de7ea82f2", // Required
    amount: "5", // Required

    // anonymous: false,
    // compliant: false,
    // transactionCode: "1_01_EXTERNAL_CODE",
    // paymentId: "9625",
    // recipientNote: "Private note",
    // baseRate: 1,
    // senderNote: "Sender note",
  };
};
