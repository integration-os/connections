/**
 * ----------------------------------------------------------------------------------------------------
 * Send BNB From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BnbTransfer
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
    fromPrivateKey: `8ac4b14b38d8a5af58019088ce5a24b764536bccd1981cf79d3e09e9d1f2ad31`, // Required
    amount: `10000`, // Required
    address: `tbnb1q82g2h9q0kfe7sysnj5w7nlak92csfjztymp39`, // Required
    senderAccountId: `61b3bffddfb389cde19c73be`, // Required

    // compliant: false,
    // attr: `12355`,
    // paymentId: `1234`,
    // senderNote: `Sender note`,
  };
};
