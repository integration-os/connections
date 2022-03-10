/**
 * ----------------------------------------------------------------------------------------------------
 * Send Bitcoin Cash From Tatum Account to Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BchTransfer
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
    senderAccountId: "5e68c66581f2ee32bc354087", // Required
    address: "bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzez", // Required
    amount: "0.001", // Required
    mnemonic:
      "urge pulp usage sister evidence arrest palm math please chief egg abuse", // Required
    xpub: "xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid", // Required

    // compliant: false,
    // multipleAmounts: ["0.1"],
    // fee: "0.00005",
    // attr: "string",
    // paymentId: "1234",
    // senderNote: "Sender note",
  };
};
