/**
 * ----------------------------------------------------------------------------------------------------
 * Remove Address for Account [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/removeAddress
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
    id: `5e68c66581f2ee32bc354087`, // Required
    address: `2MsM67NLa71fHvTUBqNENW15P68nHB2vVXb`, // Required

    // index: 1,
  };
};
