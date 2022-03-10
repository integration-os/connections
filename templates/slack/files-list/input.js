/**
 * ----------------------------------------------------------------------------------------------------
 * List for a Team, in a Channel, or From a User with Applied Filters. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/files.list
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

    // user: "string",
    // channel: "string",
    // ts_from: 0,
    // ts_to: 0,
    // types: "string",
    // count: "string",
    // page: "string",
    // show_files_hidden_by_limit: true,
  };
};
