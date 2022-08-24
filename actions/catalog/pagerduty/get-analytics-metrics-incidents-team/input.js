const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    xEARLYACCESS: "analytics-v2", // Required

    // filters: {
    //     created_at_start: "2020-01-01T00:00:00+05:00",
    //     created_at_end: "2020-02-01T00:00:00Z",
    //     urgency: "high",
    //     major: true,
    //     team_ids: ["P373JQQ", "PAECHJV", "P7SYGW6"],
    //     service_ids: ["PSEJLIN", "PSLWBL8", "PT4KHLX"],
    //     priority_ids: ["PC8O0L3", "PX01HJD", "P5FK83M"],
    //     priority_names: ["P1", "P2", "P3"]
    //   },
    // time_zone: "Etc/UTC",
    // aggregate_unit: "day",
  };
};
