/**
 * ----------------------------------------------------------------------------------------------------
 * Set the Workspaces in an Enterprise Grid Org that Connect to a Public or Private Channel. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.setTeams
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
    channel_id: "string", // Required

    // org_channel: true,
    // target_team_ids: "string",
    // team_id: "string",
  };
};
