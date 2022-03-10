/**
 * ----------------------------------------------------------------------------------------------------
 * Set ERC20/BEP20/HRM20/TRC20/KCS20 Token Contract Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/storeTokenAddress
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
    address: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85", // Required
    name: "MY_TOKEN", // Required
  };
};
