const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    template_owner: "string", // Required
    template_repo: "string", // Required
    name: "string", // Required

    // owner: "string",
    // description: "string",
    // include_all_branches: false,
    // private: false,
  };
};
