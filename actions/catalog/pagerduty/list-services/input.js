const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // query: "string",
    // limit: 0,
    // offset: 0,
    // total: false,
    // team_ids: ["string"],
    // time_zone: "UTC",
    // sort_by: "name",
    // include: "escalation_policies",
  };
};
