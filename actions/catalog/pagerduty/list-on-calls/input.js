const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // time_zone: "UTC",
    // limit: 0,
    // offset: 0,
    // total: false,
    // include: "escalation_policies",
    // user_ids: ["string"],
    // escalation_policy_ids: ["string"],
    // schedule_ids: ["string"],
    // since: "2019-08-24T14:15:22Z",
    // until: "2019-08-24T14:15:22Z",
    // earliest: true,
  };
};
