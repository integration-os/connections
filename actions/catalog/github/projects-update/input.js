const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    project_id: 0, // Required

    // name: "Week One Sprint",
    // body: "This project represents the sprint of the first week in January",
    // state: "open",
    // organization_permission: "read",
    // private: true,
  };
};
