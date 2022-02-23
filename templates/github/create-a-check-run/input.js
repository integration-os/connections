/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Check Run [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/checks#create-a-check-run
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
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    owner: "string", // Required
    repo: "string", // Required
    head_sha: "string", // Required
    name: "string", // Required

    // details_url: "string",
    // external_id: "string",
    // status: "queued",
    // started_at: "2019-08-24T14:15:22Z",
    // conclusion: "action_required",
    // completed_at: "2019-08-24T14:15:22Z",
    // output: {"title":"string","summary":"string","text":"string","annotations":[{"path":"string","start_line":0,"end_line":0,"start_column":0,"end_column":0,"annotation_level":"notice","message":"string","title":"string","raw_details":"string"}],"images":[{"alt":"string","image_url":"string","caption":"string"}]},
    // actions: [{"label":"string","description":"string","identifier":"string"}],
  };
};
