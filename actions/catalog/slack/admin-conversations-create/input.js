const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    is_private: true, // Required
    name: "string", // Required

    // description: "string",
    // org_wide: true,
    // team_id: "string",
  };
};
