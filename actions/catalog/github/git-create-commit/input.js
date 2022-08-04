const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    owner: "string", // Required
    repo: "string", // Required
    message: "string", // Required
    tree: "string", // Required

    // parents: ["string"],
    // author: { name: "string", email: "string", date: "2019-08-24T14:15:22Z" },
    // committer: { name: "string", email: "string", date: "2019-08-24T14:15:22Z" },
    // signature: "string",
  };
};
