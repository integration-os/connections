const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    incident: {
      type: "incident",
      status: "resolved",
      priority: { type: "priority_reference" },
      resolution: "string",
      title: "string",
      escalation_level: 0,
      assignments: [{ assignee: { type: "user_reference" } }],
      escalation_policy: { type: "escalation_policy_reference" },
      urgency: "high",
      conference_bridge: { conference_number: "string", conference_url: "string" },
    }, // Required
  };
};
