/**
 * ----------------------------------------------------------------------------------------------------
 * Generate Custodial Wallet Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GenerateCustodialWalletBatch
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
    chain: "MATIC", // Required
    fromPrivateKey:
      "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2", // Required
    batchCount: 270, // Required
    owner: "0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea", // Required

    // testnetType: "ethereum-ropsten",
    // fee: { gasLimit: "40000", gasPrice: "20" },
    // nonce: 0,
  };
};
