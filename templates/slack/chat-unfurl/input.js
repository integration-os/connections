/**
 * ----------------------------------------------------------------------------------------------------
 * Provide Custom Unfurl Behavior for User-Posted URLs [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/chat.unfurl
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
    channel: "string", // Required
    ts: "string", // Required

    // unfurls: "string",
    // user_auth_message: "string",
    // user_auth_required: true,
    // user_auth_url: "string",
  };
};
