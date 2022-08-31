const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    xEARLYACCESS: "business-impact-early-access", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    global_threshold: { id: "string", order: 0 }, // Required
  };
};
