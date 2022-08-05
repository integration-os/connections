const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    scopes: "string", // Required
    trigger_id: "string", // Required
  };
};
