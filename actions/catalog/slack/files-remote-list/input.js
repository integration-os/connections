const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channel: "string",
    // ts_from: 0,
    // ts_to: 0,
    // limit: 0,
    // cursor: "string",
  };
};
