const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    projectSlug: "string", // Required
    name: "foo", // Required
    value: "xxxx1234", // Required
  };
};
