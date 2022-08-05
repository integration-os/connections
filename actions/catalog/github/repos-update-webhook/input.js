const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    owner: "string", // Required
    repo: "string", // Required
    hook_id: 0, // Required

    // config: {
    //     url: "https://example.com/webhook",
    //     content_type: "json",
    //     secret: "********",
    //     insecure_ssl: "0",
    //     address: "bar@example.com",
    //     room: "The Serious Room"
    //   },
    // events: ["push"],
    // add_events: ["string"],
    // remove_events: ["string"],
    // active: true,
  };
};
