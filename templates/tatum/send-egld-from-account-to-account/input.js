/**
 * ----------------------------------------------------------------------------------------------------
 * Send EGLD From Account to Account [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EgldBlockchainTransfer
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
    fromPrivateKey: `0cd8e6217b4a218807b858ffb508483cdcdadbb7a21196727f764a510a692760`, // Required

    // from: `erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7`,
    // to: `erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq6`,
    // amount: `0`,
    // fee: {"gasLimit":"500000","gasPrice":"1000000000"},
    // data: `Hello world`,
  };
};
