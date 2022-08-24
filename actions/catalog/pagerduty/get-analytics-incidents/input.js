const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    xEARLYACCESS: "analytics-v2", // Required

    // filters: {
    //     created_at_start: "2020-05-01T00:00:00-04:00",
    //     created_at_end: "2020-06-01T00:00:00-04:00",
    //     urgency: "high",
    //     major: true,
    //     team_ids: ["P373JQQ", "PAECHJV", "P7SYGW6"],
    //     service_ids: ["PC8O0L3", "PX01HJD", "P5FK83M"],
    //     priority_ids: ["PITMC5Y", "PEHBBT8", "PB8QADI"],
    //     priority_names: ["P1", "P2", "P3"]
    //   },
    // starting_after: "string",
    // ending_before: "string",
    // order: "asc",
    // order_by: "created_at",
    // limit: 20,
    // time_zone: "Etc/UTC",
  };
};
