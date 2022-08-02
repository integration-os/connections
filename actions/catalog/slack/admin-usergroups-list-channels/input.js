const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    usergroup_id: "string", // Required

    // team_id: "string",
    // include_num_members: true,
  };
};
