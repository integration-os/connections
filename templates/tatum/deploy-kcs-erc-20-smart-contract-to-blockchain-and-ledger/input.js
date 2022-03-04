/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy Kcs ERC20 Smart Contract to Blockchain and Ledger [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/KcsDeployErc20Ledger
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
    index: 0, // Required
    mnemonic: `urge pulp usage sister evidence arrest palm math please chief egg abuse`, // Required
    address: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    basePair: `EUR`, // Required
    description: `My ERC20 Token`, // Required
    supply: `10000000`, // Required
    symbol: `MT`, // Required

    // baseRate: 1,
    // customer: {"accountingCurrency":"USD","customerCountry":"US","externalId":"123654","providerCountry":"US"},
    // nonce: 0,
  };
};
