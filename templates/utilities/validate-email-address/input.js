/**
 * ----------------------------------------------------------------------------------------------------
 * Validate Email Address [Input]
 *
 * @author    Buildable Technologies Inc.
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
 * @param {Object} $nodes - Data from the Nodes above
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    email: "example@domain.com", // Required
  };
};
