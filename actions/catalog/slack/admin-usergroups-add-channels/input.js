const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel_ids: "string", // Required
    usergroup_id: "string", // Required

    // team_id: "string",
  };
};
