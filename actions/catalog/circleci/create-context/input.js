const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    name: "string", // Required
    owner: { id: "497f6eca-6276-4993-bfeb-53cbbbba6f08", type: "organization" }, // Required
  };
};
