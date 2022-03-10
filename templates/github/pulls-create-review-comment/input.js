/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Review Comment for a Pull Request [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/pulls#create-a-review-comment-for-a-pull-request
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
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required
    owner: "string", // Required
    repo: "string", // Required
    pull_number: 0, // Required
    body: "string", // Required

    // commit_id: "string",
    // path: "string",
    // position: 0,
    // side: "LEFT",
    // line: 0,
    // start_line: 0,
    // start_side: "LEFT",
    // in_reply_to: 2,
  };
};
