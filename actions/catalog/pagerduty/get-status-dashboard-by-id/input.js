const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    xEARLYACCESS: "status-dashboards", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
  };
};
