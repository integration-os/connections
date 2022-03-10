/**
 * ----------------------------------------------------------------------------------------------------
 * List All Historical Trades [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/getHistoricalTradesBody
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
    pageSize: 10, // Required

    // id: "5e68c66581f2ee32bc354087",
    // customerId: "5e68c66581f2ee32bc354087",
    // offset: 0,
    // pair: "BTC/EUR",
    // count: true,
    // types: ["BUY"],
    // amount: [{ op: "gte", value: "1.5" }],
    // fill: [{ op: "gte", value: "1.5" }],
    // price: [{ op: "gte", value: "1.5" }],
    // created: [{ op: "gte", value: "1.5" }],
    // sort: ["PRICE_ASC"],
  };
};
