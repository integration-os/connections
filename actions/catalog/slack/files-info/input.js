const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // file: "string",
    // count: "string",
    // page: "string",
    // limit: 0,
    // cursor: "string",
  };
};
