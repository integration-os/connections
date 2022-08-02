const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // exclude_archived: true,
    // types: "string",
    // limit: 0,
    // cursor: "string",
  };
};
