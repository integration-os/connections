const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    webhook_subscription: {
      type: "webhook_subscription",
      active: true,
      delivery_method: {
        temporarily_disabled: true,
        type: "http_delivery_method",
        url: "string",
        custom_headers: [],
      },
      description: "string",
      events: ["string"],
      filter: { id: "string", type: "account_reference" },
    }, // Required
  };
};
