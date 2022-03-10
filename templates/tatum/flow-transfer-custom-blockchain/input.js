/**
 * ----------------------------------------------------------------------------------------------------
 * Send Arbitrary Transaction to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/FlowTransferCustomBlockchain
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
    account: "0x955cd3f17b2fd8ad", // Required
    transaction: `transaction(publicKey: String) {
  prepare(signer: AuthAccount) {
    signer.addPublicKey(publicKey.decodeHex())
  }
}
`, // Required
    args: [{ value: "string", type: "Identity", subType: "Identity" }], // Required
    mnemonic:
      "urge pulp usage sister evidence arrest palm math please chief egg abuse", // Required
    index: 0, // Required
  };
};
