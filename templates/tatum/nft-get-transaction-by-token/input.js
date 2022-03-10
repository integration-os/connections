/**
 * ----------------------------------------------------------------------------------------------------
 * Get NFT Transactions by Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/NftGetTransactionByToken
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
    tokenId: 1, // Required
    tokenAddress: "0x1ce4e40889a13971681391aad29e88efaf91f784", // Required
    pageSize: 10, // Required

    // offset: 0,
    // from: 1087623,
    // to: 1087823,
  };
};
