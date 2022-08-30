const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    service: {
      id: "PSI2I2O",
      summary: "string",
      type: "service",
      self: "string",
      html_url: "string",
      name: "My Web App",
      description: "My cool web application that does things.",
      auto_resolve_timeout: 14400,
      acknowledgement_timeout: 600,
      status: "active",
      escalation_policy: { id: "PWIP6CQ", type: "escalation_policy_reference" },
      response_play: {
        id: "1677af3c-44cf-50f4-6c68-818f7f514802",
        type: "response_play_reference",
      },
      incident_urgency_rule: {
        type: "use_support_hours",
        during_support_hours: { type: "constant", urgency: "high" },
        outside_support_hours: { type: "constant", urgency: "low" },
      },
      support_hours: {
        type: "fixed_time_per_day",
        time_zone: "America/Lima",
        start_time: "09:00:00",
        end_time: "17:00:00",
        days_of_week: [1, 2, 3, 4, 5],
      },
      scheduled_actions: [
        {
          type: "urgency_change",
          at: { type: "named_time", name: "support_hours_start" },
          to_urgency: "high",
        },
      ],
      alert_creation: "create_alerts_and_incidents",
      alert_grouping_parameters: { type: "time", config: { timeout: 2 } },
      auto_pause_notifications_parameters: { enabled: true, timeout: 300 },
    }, // Required
  };
};
