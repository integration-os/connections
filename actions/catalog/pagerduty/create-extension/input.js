const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    extension: {
      id: "PJU23I3",
      endpoint_url: "https://example.com/receive_a_pagerduty_webhook",
      name: "My Webhook",
      summary: "My Webhook",
      type: "extension",
      extension_schema: { id: "PJFWPEP", type: "extension_schema_reference" },
      extension_objects: [{ id: "PIJ90N7", type: "service_reference" }],
      config: { anykey: "anyvalue" },
    }, // Required
  };
};
