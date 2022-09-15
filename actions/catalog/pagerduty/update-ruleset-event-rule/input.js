const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    rule_id: "string", // Required
    rule_id: "string", // Required

    // rule: {
    //     disabled: true,
    //     conditions: {
    //       operator: "and",
    //       subconditions: [
    //         { operator: "exists", parameters: { path: "string", value: "string", options: {} } }
    //       ]
    //     },
    //     time_frame: {
    //       active_between: { start_time: 0, end_time: 0 },
    //       scheduled_weekly: { start_time: 0, duration: 0, timezone: "string", weekdays: [0] }
    //     },
    //     variables: [{ type: "regex", name: "string", parameters: { value: "string", path: "string" } }],
    //     position: 0,
    //     actions: {
    //       annotate: { value: "string" },
    //       event_action: { value: "trigger" },
    //       extractions: [{ target: "string", source: "string", regex: "string" }],
    //       priority: { value: "string" },
    //       severity: { value: "info" },
    //       suppress: {
    //         value: true,
    //         threshold_value: 0,
    //         threshold_time_unit: "seconds",
    //         threshold_time_amount: 0
    //       },
    //       suspend: { value: 0 },
    //       route: { value: "string" }
    //     }
    //   },
  };
};
