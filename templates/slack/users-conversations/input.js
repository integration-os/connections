/**
 * ----------------------------------------------------------------------------------------------------
 * List Conversations the Calling User May Access. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/users.conversations
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
    // types: "string",
    // exclude_archived: true,
    // limit: 0,
    // cursor: "string",
  };
};
