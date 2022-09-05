const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // limit: 0,
    // offset: 0,
    // total: false,
    // date_range: "all",
    // incident_key: "string",
    // service_ids: ["string"],
    // team_ids: ["string"],
    // user_ids: ["string"],
    // urgencies: "high",
    // time_zone: "UTC",
    // statuses: "triggered",
    // sort_by: ["string"],
    // include: "users",
    // since: "string",
    // until: "string",
  };
};
