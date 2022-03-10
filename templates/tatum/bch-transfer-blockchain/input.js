/**
 * ----------------------------------------------------------------------------------------------------
 * Send Bitcoin Cash to Blockchain Addresses [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BchTransferBlockchain
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
    fromUTXO: [
      {
        txHash:
          "53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc",
        index: 0,
        privateKey: "cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf",
      },
    ], // Required
    to: [
      {
        address: "bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzez",
        value: 0.02969944,
      },
    ], // Required
  };
};
