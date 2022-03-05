/**
 * ----------------------------------------------------------------------------------------------------
 * Create New Virtual Currency [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/createCurrency
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
    basePair: `BTC`, // Required
    supply: `1000000`, // Required
    name: `VC_VIRTUAL`, // Required

    // baseRate: 1,
    // customer: {"accountingCurrency":"USD","customerCountry":"US","externalId":"123654","providerCountry":"US"},
    // description: `My Virtual Token description.`,
    // accountCode: `AC_1011_B`,
    // accountNumber: `1234567890`,
    // accountingCurrency: `USD`,
  };
};
