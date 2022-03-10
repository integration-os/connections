/**
 * ----------------------------------------------------------------------------------------------------
 * Schedules a Message to Be Sent to a Channel. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/chat.scheduleMessage
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

    // as_user: true,
    // attachments: "string",
    // blocks: "string",
    // channel: "string",
    // link_names: true,
    // parse: "string",
    // post_at: "string",
    // reply_broadcast: true,
    // text: "string",
    // thread_ts: 0,
    // unfurl_links: true,
    // unfurl_media: true,
  };
};
