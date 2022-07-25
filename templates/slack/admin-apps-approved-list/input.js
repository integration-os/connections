const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // limit: 0,
    // cursor: "string",
    // team_id: "string",
    // enterprise_id: "string",
  };
};
