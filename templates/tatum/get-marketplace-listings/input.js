/**
 * ----------------------------------------------------------------------------------------------------
 * Get Open/cancelled/sold Listings From the NFT Marketplace [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GetMarketplaceListings
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
    contractAddress: "0xe6e7340394958674cdf8606936d292f565e4ecc4", // Required
    type: "INITIATED", // Required
  };
};
