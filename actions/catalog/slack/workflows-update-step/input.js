const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    workflow_step_edit_id: "string", // Required

    // inputs: "string",
    // outputs: "string",
    // step_name: "string",
    // step_image_url: "string",
  };
};
