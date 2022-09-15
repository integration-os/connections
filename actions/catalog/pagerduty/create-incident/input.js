const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    incident: {
      type: "incident",
      title: "string",
      service: { type: "service_reference" },
      priority: { type: "priority_reference" },
      urgency: "high",
      body: { type: "incident_body", details: "string" },
      incident_key: "string",
      assignments: [{ assignee: { type: "user_reference" } }],
      escalation_policy: { type: "escalation_policy_reference" },
      conference_bridge: { conference_number: "string", conference_url: "string" },
    }, // Required
  };
};
