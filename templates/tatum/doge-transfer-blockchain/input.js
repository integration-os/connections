/**
 * ----------------------------------------------------------------------------------------------------
 * Send Dogecoin to Blockchain Addresses [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/DogeTransferBlockchain
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
    fee: "0.0015", // Required
    changeAddress: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7", // Required
    fromUTXO: [
      {
        txHash:
          "53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc",
        value: "0.0015",
        address: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7",
        index: 0,
        privateKey: "cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf",
      },
    ], // Required
    to: [{ address: "2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7", value: 0.02969944 }], // Required
  };
};
