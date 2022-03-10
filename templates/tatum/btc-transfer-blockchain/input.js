/**
 * ----------------------------------------------------------------------------------------------------
 * Send Bitcoin to Blockchain Addresses [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BtcTransferBlockchain
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
    fromAddress: [
      {
        address: "2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS",
        privateKey: "cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf",
      },
    ], // Required
    to: [{ address: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7", value: 0.02969944 }], // Required
  };
};
