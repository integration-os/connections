const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    escalation_policy: {
      id: "PQIL2IX",
      type: "escalation_policy",
      name: "Engineering Escalation Policy",
      escalation_rules: [
        { escalation_delay_in_minutes: 30, targets: [{ id: "PEYSGVF", type: "user_reference" }] },
      ],
      services: [{ id: "PIJ90N7", type: "service_reference" }],
      num_loops: 2,
      on_call_handoff_notifications: "if_has_services",
      teams: [{ id: "PQ9K7I8", type: "team_reference" }],
      description: "Here is the ep for the engineering team.",
    }, // Required

    // from: "user@example.com",
  };
};
