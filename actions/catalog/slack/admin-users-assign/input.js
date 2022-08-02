const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    team_id: "string", // Required
    user_id: "string", // Required

    // channel_ids: "string",
    // is_restricted: true,
    // is_ultra_restricted: true,
  };
};
