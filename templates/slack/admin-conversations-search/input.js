/**
 * ----------------------------------------------------------------------------------------------------
 * Search for Public or Private Channels in an Enterprise Organization. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.search
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

    // team_ids: "string",
    // query: "string",
    // limit: 0,
    // cursor: "string",
    // search_channel_types: "string",
    // sort: "string",
    // sort_dir: "string",
  };
};
