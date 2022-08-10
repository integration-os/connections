const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    projectSlug: "string", // Required

    // branch: "feature/design-new-api",
    // tag: "v3.1.4159",
    // parameters: { deploy_prod: true },
  };
};
