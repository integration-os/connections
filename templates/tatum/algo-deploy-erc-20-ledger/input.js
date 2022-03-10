/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy Algo ERC20 to Blockchain and Ledger [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/AlgoDeployErc20Ledger
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
    symbol: "MT", // Required
    supply: "10000000", // Required
    description: "My ERC20 Token", // Required
    basePair: "EUR", // Required
    address: "NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y", // Required
    mnemonic:
      "artist alarm clerk obscure timber firm reopen provide ankle vicious exhibit waste math toilet believe puppy lucky coast post kind black suspect mule able market", // Required

    // baseRate: 1,
    // customer: {
    //     accountingCurrency: "USD",
    //     customerCountry: "US",
    //     externalId: "123654",
    //     providerCountry: "US"
    //   },
  };
};
