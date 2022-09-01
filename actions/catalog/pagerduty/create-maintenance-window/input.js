const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    maintenance_window: {
      id: "PIJ89JD",
      type: "maintenance_window",
      start_time: "2015-11-09T20:00:00-05:00",
      end_time: "2015-11-09T22:00:00-05:00",
      description: "Immanentizing the eschaton",
      services: [{ id: "PIJ90N7", type: "service_reference" }],
    }, // Required
  };
};
