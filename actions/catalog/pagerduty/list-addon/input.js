const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // limit: 0,
    // offset: 0,
    // total: false,
    // include: "services",
    // service_ids: ["string"],
    // filter: "full_page_addon",
  };
};
