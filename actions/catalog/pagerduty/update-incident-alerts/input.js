const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    alerts: [
      {
        type: "alert",
        status: "resolved",
        incident: { id: "PEYSGVF", type: "incident_reference" },
        body: {
          type: "alert_body",
          contexts: [{ type: "link" }],
          details: { customKey: "Server is on fire!", customKey2: "Other stuff!" },
        },
      },
    ], // Required

    // limit: 0,
    // offset: 0,
    // total: false,
  };
};
