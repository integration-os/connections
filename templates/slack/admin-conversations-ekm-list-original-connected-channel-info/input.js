/**
 * ----------------------------------------------------------------------------------------------------
 * List All Disconnected Channels—i.e., Channels that Were Once Connected to Other Workspaces and Then  [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
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

    // channel_ids: "string",
    // team_ids: "string",
    // limit: 0,
    // cursor: "string",
  };
};
