/**
 * ----------------------------------------------------------------------------------------------------
 * Get Sell Price [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.coinbase.com/api/v2#get-sell-price
 *
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
    baseURL: "https://api.coinbase.com/v2", // Required
    currencyPair: "BTC-USD", // Required
  };
};
