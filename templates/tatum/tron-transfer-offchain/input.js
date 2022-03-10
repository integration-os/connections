/**
 * ----------------------------------------------------------------------------------------------------
 * Send Tron or TRC Asset From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TronTransferOffchain
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
    address: "TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW", // Required
    amount: "100000", // Required
    fromPrivateKey:
      "e75d702ce00987633f8009fbb1eabb5b187cb5b50fe9179a8d6cee6bab076b66", // Required
    senderAccountId: "5e68c66581f2ee32bc354087", // Required

    // compliant: false,
    // fee: "2.5",
    // paymentId: "1234",
    // senderNote: "Sender note",
  };
};
