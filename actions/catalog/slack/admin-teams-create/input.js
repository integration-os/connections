const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    team_domain: "string", // Required
    team_name: "string", // Required

    // team_description: "string",
    // team_discoverability: "string",
  };
};
