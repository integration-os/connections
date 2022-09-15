const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required

    // limit: 0,
    // offset: 0,
    // total: false,
    // alert_key: "string",
    // statuses: "triggered",
    // sort_by: "created_at",
    // include: "services",
  };
};
