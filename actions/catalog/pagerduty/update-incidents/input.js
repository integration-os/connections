const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    incidents: [
      {
        id: "string",
        type: "incident",
        status: "resolved",
        resolution: "string",
        title: "string",
        priority: { type: "priority_reference" },
        escalation_level: 0,
        assignments: [{ assignee: { type: "user_reference" } }],
        escalation_policy: { type: "escalation_policy_reference" },
        conference_bridge: { conference_number: "string", conference_url: "string" },
      },
    ], // Required

    // limit: 0,
    // offset: 0,
    // total: false,
  };
};
