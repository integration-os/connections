/**
 * ----------------------------------------------------------------------------------------------------
 * Turns on Do Not Disturb Mode for the Current User, or Changes Its Duration. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/dnd.setSnooze
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
    num_minutes: "string", // Required
    token: "string", // Required
  };
};
