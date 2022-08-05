const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // exclude_archived: true,
    // types: "string",
    // limit: 0,
    // cursor: "string",
  };
};
