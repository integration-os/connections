/**
 * ----------------------------------------------------------------------------------------------------
 * Send XRP From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XrpTransfer
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
    account: "rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV", // Required
    address: "rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV", // Required
    amount: "10000", // Required
    secret: "snSFTHdvSYQKKkYntvEt8cnmZuPJB", // Required

    // compliant: false,
    // attr: "12355",
    // sourceTag: 12355,
    // paymentId: "1234",
    // senderNote: "Sender note",
  };
};
