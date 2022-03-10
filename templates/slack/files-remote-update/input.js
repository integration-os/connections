/**
 * ----------------------------------------------------------------------------------------------------
 * Updates an Existing Remote File. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/files.remote.update
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

    // external_id: "string",
    // external_url: "string",
    // file: "string",
    // filetype: "string",
    // indexable_file_contents: "string",
    // preview_image: "string",
    // title: "string",
    // token: "string",
  };
};
