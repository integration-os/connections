/**
 * ----------------------------------------------------------------------------------------------------
 * Store Buy / Sell Trade [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/storeTrade
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
    type: "BUY", // Required
    price: "8650.4", // Required
    amount: "15000", // Required
    pair: "BTC/EUR", // Required
    currency1AccountId: "7c21ed165e294db78b95f0f1", // Required
    currency2AccountId: "7c21ed165e294db78b95f0f1", // Required
    attr: { sealDate: 1572031674384, percentBlock: 1.5, percentPenalty: 1.5 }, // Required

    // feeAccountId: "7c21ed165e294db78b95f0f1",
    // fee: 1.5,
  };
};
