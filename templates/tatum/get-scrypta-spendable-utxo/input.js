/**
 * ----------------------------------------------------------------------------------------------------
 * Get Scrypta Spendable UTXO [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GetScryptaspendableUTXO
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
    pageSize: 50, // Required
    offset: 100, // Required
    address: `2ac9175db66a9e646034a9663870743d177175ceff6c25231528cb7690900a78`, // Required
  };
};
