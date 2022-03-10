/**
 * ----------------------------------------------------------------------------------------------------
 * Estimate Ethereum Transaction Fees [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/EthEstimateGas
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
    from: "0xfb99f8ae9b70a0c8cd96ae665bbaf85a7e01a2ef", // Required
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85", // Required
    amount: "100000", // Required

    // testnetType: "ethereum-ropsten",
    // contractAddress: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    // data: "My note to recipient.",
  };
};
