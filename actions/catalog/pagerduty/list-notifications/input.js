const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    since: "2019-08-24T14:15:22Z", // Required
    until: "2019-08-24T14:15:22Z", // Required

    // limit: 0,
    // offset: 0,
    // total: false,
    // time_zone: "UTC",
    // filter: "sms_notification",
    // include: "users",
  };
};
