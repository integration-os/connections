const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    owner: "string", // Required
    repo: "string", // Required
    commit_sha: "string", // Required
    ref: "string", // Required
    sarif: "string", // Required

    // checkout_uri: "file:///github/workspace/",
    // started_at: "2019-08-24T14:15:22Z",
    // tool_name: "string",
  };
};
