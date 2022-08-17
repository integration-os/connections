const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    projectSlug: "string", // Required
    workflowName: "string", // Required

    // branch: "string",
    // granularity: "daily",
    // startDate: "2019-08-24T14:15:22Z",
    // endDate: "2019-08-24T14:15:22Z",
  };
};
