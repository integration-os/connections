const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    xEARLYACCESS: "business-impact-early-access", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required

    // additional_fields: "services.highest_impacting_priority",
    // ids: "string",
  };
};
