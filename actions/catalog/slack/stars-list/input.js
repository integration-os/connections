const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // count: "string",
    // page: "string",
    // cursor: "string",
    // limit: 0,
  };
};
