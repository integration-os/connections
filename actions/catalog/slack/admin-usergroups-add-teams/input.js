const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    team_ids: "string", // Required
    usergroup_id: "string", // Required

    // auto_provision: true,
  };
};
