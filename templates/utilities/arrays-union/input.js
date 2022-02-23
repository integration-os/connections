/**
 * ----------------------------------------------------------------------------------------------------
 * Merge and Clean Arrays [Input]
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
    // Required - Array of all arrays you want to merge
    arrays: [
      [1, 2, 3, 4, 5, 5],
      [2, 3, 4, 5, 6, 6],
      [100, 500, 6, 250],
    ],
  };
};
