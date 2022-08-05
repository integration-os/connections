const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel_ids: "string", // Required
    team_id: "string", // Required
    token: "string", // Required
  };
};
