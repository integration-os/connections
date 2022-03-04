/**
 * ----------------------------------------------------------------------------------------------------
 * Get Ethereum Internal Transactions by Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EthGetInternalTransactionByAddress
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
    address: `0x8ce4e40889a13971681391aad29e88efaf91f784`, // Required
    pageSize: 10, // Required

    // testnetType: `ethereum-ropsten`,
    // offset: 0,
  };
};
