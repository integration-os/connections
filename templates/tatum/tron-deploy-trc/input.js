/**
 * ----------------------------------------------------------------------------------------------------
 * Deploy Tron TRC-10/20 Smart Contract to Blockchain and Ledger [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TronDeployTrc
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
    decimals: 6, // Required
    type: "TRC10", // Required
    description: "My TRC Token", // Required
    basePair: "EUR", // Required
    address: "TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW", // Required
    mnemonic:
      "urge pulp usage sister evidence arrest palm math please chief egg abuse", // Required
    index: 0, // Required

    // url: "https://mytoken.com",
    // baseRate: 1,
    // customer: {
    //     accountingCurrency: "USD",
    //     customerCountry: "US",
    //     externalId: "123654",
    //     providerCountry: "US"
    //   },
  };
};
