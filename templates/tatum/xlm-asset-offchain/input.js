/**
 * ----------------------------------------------------------------------------------------------------
 * Create XLM Based Asset [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XlmAssetOffchain
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
    issuerAccount: "GC5LAVZ5UPLIFDH6SI33PNVL5TKWA4ODXTI3WEF5JM6LRM5MNGVJ56TT", // Required
    token: "TOKEN123", // Required
    basePair: "EUR", // Required
  };
};
