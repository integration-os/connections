const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required

    // webhook_subscription: {
    //     description: "string",
    //     events: ["string"],
    //     filter: { id: "string", type: "account_reference" },
    //     active: true
    //   },
  };
};
