/**
 * ----------------------------------------------------------------------------------------------------
 * Set the User Profile Photo [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/users.setPhoto
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
    SLACK_ACCESS_TOKEN: $trigger.env.SLACK_ACCESS_TOKEN, // Required
    token: "string", // Required

    // crop_w: "string",
    // crop_x: "string",
    // crop_y: "string",
    // image: "string",
  };
};
