const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // user: "string",
    // full: true,
    // count: 0,
    // page: 0,
    // cursor: "string",
    // limit: 0,
  };
};
