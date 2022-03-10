/**
 * ----------------------------------------------------------------------------------------------------
 * Send Flow or FUSD From Tatum Account to Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/FlowTransfer
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
    senderAccountId: "61b3bffddfb389cde19c73be", // Required
    account: "0x955cd3f17b2fd8ad", // Required
    address: "0x955cd3f17b2fd8ae", // Required
    amount: "10000", // Required
    mnemonic:
      "urge pulp usage sister evidence arrest palm math please chief egg abuse", // Required
    index: 0, // Required

    // compliant: false,
    // paymentId: "1234",
    // senderNote: "Sender note",
  };
};
