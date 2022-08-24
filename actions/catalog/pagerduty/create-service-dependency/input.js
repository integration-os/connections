const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // relationships: [
    //     {
    //       supporting_service: { id: "string", type: "string" },
    //       dependent_service: { id: "string", type: "string" }
    //     }
    //   ],
  };
};
