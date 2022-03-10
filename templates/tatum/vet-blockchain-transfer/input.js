/**
 * ----------------------------------------------------------------------------------------------------
 * Send VeChain From Account to Account [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/VetBlockchainTransfer
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
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85", // Required
    amount: "100000", // Required

    // fromPrivateKey: "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2",
    // signatureId: "26d3883e-4e17-48b3-a0ee-09a3e484ac83",
    // data: "My note to recipient.",
    // fee: { gasLimit: "40000" },
  };
};
