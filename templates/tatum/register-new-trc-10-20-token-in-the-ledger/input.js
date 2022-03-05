/**
 * ----------------------------------------------------------------------------------------------------
 * Register New TRC-10/20 Token in the Ledger [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/createTrc
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
    basePair: `EUR`, // Required
    description: `My Public Token`, // Required
    type: `TRC10`, // Required
    decimals: 6, // Required
    supply: `1000000.0`, // Required
    symbol: `MY_TOKEN`, // Required

    // url: `https://mytoken.com`,
    // baseRate: 1,
    // customer: {"accountingCurrency":"USD","customerCountry":"US","externalId":"123654","providerCountry":"US"},
    // accountingCurrency: `USD`,
    // derivationIndex: 0,
    // xpub: `xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid`,
    // address: `TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW`,
  };
};
