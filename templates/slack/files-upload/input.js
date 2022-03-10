/**
 * ----------------------------------------------------------------------------------------------------
 * Uploads or Creates a File. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/files.upload
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

    // channels: "string",
    // content: "string",
    // file: "string",
    // filename: "string",
    // filetype: "string",
    // initial_comment: "string",
    // thread_ts: 0,
    // title: "string",
    // token: "string",
  };
};
