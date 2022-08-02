const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channel_ids: "string",
    // team_ids: "string",
    // limit: 0,
    // cursor: "string",
  };
};
