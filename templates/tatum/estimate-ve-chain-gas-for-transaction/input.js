/**
 * ----------------------------------------------------------------------------------------------------
 * Estimate VeChain Gas for Transaction [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/VetEstimateGas
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
    value: `140`, // Required
    to: `0x5034aa590125b64023a0262112b98d72e3c8e40e`, // Required
    from: `0x5034aa590125b64023a0262112b98d72e3c8e40e`, // Required

    // data: `string`,
    // nonce: 12345,
  };
};
