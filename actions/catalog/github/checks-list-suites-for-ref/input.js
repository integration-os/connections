const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    owner: "string", // Required
    repo: "string", // Required
    ref: "string", // Required

    // app_id: 0,
    // check_name: "string",
    // per_page: 30,
    // page: 1,
  };
};