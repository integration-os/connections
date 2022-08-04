const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel_id: "string", // Required

    // org_channel: true,
    // target_team_ids: "string",
    // team_id: "string",
  };
};
