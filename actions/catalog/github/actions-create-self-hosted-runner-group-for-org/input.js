const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    org: "string", // Required
    name: "string", // Required

    // visibility: "selected",
    // selected_repository_ids: [0],
    // runners: [0],
    // allows_public_repositories: false,
  };
};
