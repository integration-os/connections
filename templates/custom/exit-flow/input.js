/**
 * ----------------------------------------------------------------------------------------------------
 * Exit Flow [Input]
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
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    exit: true,
    message: "An error occurred",
    status: 400,
    data: {
      // key: "value"
    },
  };
};
