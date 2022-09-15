const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    notification_rule_id: "string", // Required
    notification_rule: {
      type: "assignment_notification_rule",
      start_delay_in_minutes: 0,
      contact_method: { id: "PXPGF42", type: "email_contact_method_reference" },
      urgency: "high",
    }, // Required
  };
};
