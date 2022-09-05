const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    oncall_handoff_notification_rule_id: "string", // Required
    oncall_handoff_notification_rule: {
      id: "PXPGF42",
      notify_advance_in_minutes: 180,
      handoff_type: "both",
      contact_method: { id: "PXPGF42", type: "email_contact_method_reference" },
    }, // Required
  };
};
