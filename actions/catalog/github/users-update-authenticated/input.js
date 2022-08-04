const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required

    // name: "Omar Jahandar",
    // email: "omar@example.com",
    // blog: "blog.example.com",
    // twitter_username: "therealomarj",
    // company: "Acme corporation",
    // location: "Berlin, Germany",
    // hireable: true,
    // bio: "string",
  };
};
