/**
 * ----------------------------------------------------------------------------------------------------
 * Create Multiple Accounts in a Batch Call [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/createAccountBatch
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
    accounts: [
      {
        currency: "BTC",
        xpub: "xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid",
        customer: {
          accountingCurrency: "USD",
          customerCountry: "US",
          externalId: "123654",
          providerCountry: "US",
        },
        compliant: false,
        accountCode: "AC_1011_B",
        accountingCurrency: "USD",
        accountNumber: "123456",
      },
    ], // Required
  };
};
