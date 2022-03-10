/**
 * ----------------------------------------------------------------------------------------------------
 * Add an Enterprise User to a Workspace. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.users.assign
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
    team_id: "string", // Required
    user_id: "string", // Required

    // channel_ids: "string",
    // is_restricted: true,
    // is_ultra_restricted: true,
  };
};
