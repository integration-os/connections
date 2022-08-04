const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // user: "string",
    // types: "string",
    // exclude_archived: true,
    // limit: 0,
    // cursor: "string",
  };
};
