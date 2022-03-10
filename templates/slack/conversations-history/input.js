/**
 * ----------------------------------------------------------------------------------------------------
 * Fetches a Conversation's History of Messages and Events. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/conversations.history
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

    // channel: "string",
    // latest: 0,
    // oldest: 0,
    // inclusive: true,
    // limit: 0,
    // cursor: "string",
  };
};
