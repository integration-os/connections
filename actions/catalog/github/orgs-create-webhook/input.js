const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    org: "string", // Required
    name: "string", // Required
    config: {
      url: "https://example.com/webhook",
      content_type: "json",
      secret: "********",
      insecure_ssl: "0",
      username: "kdaigle",
      password: "password",
    }, // Required

    // events: ["push"],
    // active: true,
  };
};
