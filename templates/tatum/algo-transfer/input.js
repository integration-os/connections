/**
 * ----------------------------------------------------------------------------------------------------
 * Send ALGO or Erc20 From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/AlgoTransfer
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
    account: "0xee82856bf20e2aa6", // Required
    address: "0xee82856bf20e2aa6", // Required
    amount: "10000", // Required
    privateKey:
      "NBYMCVEEDFYV3TPWVRE6APE7PKHUJD4XAKXCKNCLKGUXOC3LFNJGZQCJCRA53HB7ZAHF6NFJH2QIVQ5USQNWG35QCJLD4KZ5IWMB24Q", // Required

    // compliant: false,
    // paymentId: "1234",
    // senderNote: "Sendernote",
  };
};
