/**
 * ----------------------------------------------------------------------------------------------------
 * Send Binance / Binance Token From Account to Account [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/BnbBlockchainTransfer
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
    to: "tbnb138u9djee6fwphhd2a3628q2h0j5w97yx48zqex", // Required
    currency: "BNB", // Required
    amount: "100000", // Required
    fromPrivateKey: "cTmS2jBWXgFaXZ2xG9jhn67TiyTshnMp3UedamzEhGm6BZV1vLgQ", // Required

    // message: "Message to recipient",
  };
};
