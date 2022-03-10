/**
 * ----------------------------------------------------------------------------------------------------
 * Generate Scrypta Deposit Address From Extended Public Key [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/GenerateScryptadepositaddressfromExtendedpublickey
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
    xpub: "xpub6FL6yNcaXSaJaLoe2e5a1AGWUARpC5bTLKrGLHqN3qFGeBQBYdCFsdYzgoWHMruUcBJrQ1jCpoXvqduqchuHGEvuGm9gC4JR5ZttscVxa3y", // Required
    index: "0", // Required
  };
};
