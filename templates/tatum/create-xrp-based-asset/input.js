/**
 * ----------------------------------------------------------------------------------------------------
 * Create XRP Based Asset [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XrpAssetOffchain
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
    basePair: `EUR`, // Required
    token: `DA39A3EE5E6B4B0D3255BFEF95601890AFD80709`, // Required
    issuerAccount: `rsCZjvenhxsFycrb33gPSfXdrTNAS5uiR1`, // Required
  };
};
