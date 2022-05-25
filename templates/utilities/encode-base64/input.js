/**
 * ----------------------------------------------------------------------------------------------------
 * EncodeBase64 [Input]
 *
 * @author    Giosuè Sulipano
 * @access    open
 * @license   MIT
 *
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
  const {
    plainText = "Hello world!"
  } = $trigger.body;

  return {
    plainText
  };
};
