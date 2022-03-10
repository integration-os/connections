/**
 * ----------------------------------------------------------------------------------------------------
 * Update the Configuration for a Workflow Extension Step. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/workflows.updateStep
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
    workflow_step_edit_id: "string", // Required

    // inputs: "string",
    // outputs: "string",
    // step_name: "string",
    // step_image_url: "string",
  };
};
