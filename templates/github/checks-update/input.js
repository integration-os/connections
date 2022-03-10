/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Check Run [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/checks#update-a-check-run
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
    check_run_id: 0, // Required

    // name: "string",
    // details_url: "string",
    // external_id: "string",
    // started_at: "2019-08-24T14:15:22Z",
    // status: "queued",
    // conclusion: "action_required",
    // completed_at: "2019-08-24T14:15:22Z",
    // output: {
    //     title: "string",
    //     summary: "string",
    //     text: "string",
    //     annotations: [
    //       {
    //         path: "string",
    //         start_line: 0,
    //         end_line: 0,
    //         start_column: 0,
    //         end_column: 0,
    //         annotation_level: "notice",
    //         message: "string",
    //         title: "string",
    //         raw_details: "string"
    //       }
    //     ],
    //     images: [{ alt: "string", image_url: "string", caption: "string" }]
    //   },
    // actions: [{ label: "string", description: "string", identifier: "string" }],
  };
};
