/**
 * ----------------------------------------------------------------------------------------------------
 * Send NEO Smart Contract Tokens [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/NeoInvokeSmart
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
    fromPrivateKey: `0ee69b443c740982e31ac64f8ab06006c24b7aab9e6ebe81b4663eafc72e13c9`, // Required
    to: `Abfm15QX2JCjtHPsgBwiHwMcZXWofUwCLZ`, // Required
    scriptHash: `string`, // Required
    amount: 10, // Required
    numOfDecimals: 8, // Required

    // additionalInvocationGas: 1,
  };
};
