/**
 * ----------------------------------------------------------------------------------------------------
 * Get Tron Account TRC20 Transactions [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/TronAccountTx20
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
    address: `TGDqQAP5bduoPKVgdbk7fGyW4DwEt3RRn8`, // Required

    // next: `81d0524acf5967f3b361e03fd7d141ab511791cd7aad7ae406c4c8d408290991`,
  };
};
