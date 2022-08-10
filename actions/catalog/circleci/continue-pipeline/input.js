const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    continuationKey: "string", // Required
    configuration: "string", // Required

    // parameters: { deploy_prod: true },
  };
};
