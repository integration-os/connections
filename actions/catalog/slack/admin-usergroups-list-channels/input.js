const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    usergroup_id: "string", // Required

    // team_id: "string",
    // include_num_members: true,
  };
};
