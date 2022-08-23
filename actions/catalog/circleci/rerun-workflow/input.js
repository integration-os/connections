const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08", // Required

    // enable_ssh: false,
    // from_failed: false,
    // jobs: ["c65b68ef-e73b-4bf2-be9a-7a322a9df150", "5e957edd-5e8c-4985-9178-5d0d69561822"],
    // sparse_tree: false,
  };
};
