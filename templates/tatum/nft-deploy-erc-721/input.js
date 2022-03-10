/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy NFT Smart Contract. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/NftDeployErc721
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
    chain: "CELO", // Required
    name: "My ERC721", // Required
    symbol: "ERC_SYMBOL", // Required
    fromPrivateKey:
      "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2", // Required
    feeCurrency: "CELO", // Required

    // testnetType: "ethereum-ropsten",
    // provenance: true,
    // publicMint: true,
    // nonce: 0,
  };
};
