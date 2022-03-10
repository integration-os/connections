/**
 * ----------------------------------------------------------------------------------------------------
 * Send SOL From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/SolTransfer
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
    from: "FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ", // Required
    address: "9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g", // Required
    amount: "10000", // Required
    privateKey:
      "zgsAKfjuXrAxEyuYRxbbxPM3rdsPbJPnGreaGMbcdUApJ6wHnCqQnf9b1RNPdeZxsRMkezh4VgXQ7YrbpndGtEv", // Required

    // fee: "10000",
    // compliant: false,
    // paymentId: "1234",
    // senderNote: "Sender note",
  };
};
