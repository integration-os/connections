const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    expiration_ts: 0, // Required
    team_id: "string", // Required
    user_id: "string", // Required
  };
};
