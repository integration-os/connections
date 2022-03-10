/**
 * ----------------------------------------------------------------------------------------------------
 * Registers a New Call. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/calls.add
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
    external_unique_id: "string", // Required
    join_url: "string", // Required

    // created_by: "string",
    // date_start: 0,
    // desktop_app_join_url: "string",
    // external_display_id: "string",
    // title: "string",
    // users: "string",
  };
};
