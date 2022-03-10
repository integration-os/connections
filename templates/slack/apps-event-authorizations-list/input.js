/**
 * ----------------------------------------------------------------------------------------------------
 * Get a List of Authorizations for the Given Event Context. Each Authorization Represents an App Insta [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/apps.event.authorizations.list
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
    event_context: "string", // Required

    // cursor: "string",
    // limit: 0,
  };
};
