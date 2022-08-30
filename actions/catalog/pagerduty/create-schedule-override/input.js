const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required

    // overrides: [
    //     {
    //       start: "2012-07-01T00:00:00-04:00",
    //       end: "2012-07-02T00:00:00-04:00",
    //       user: { id: "PEYSGVF", type: "user_reference" }
    //     }
    //   ],
  };
};
