const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    xEARLYACCESS: "status-update-notification-rules", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    status_update_notification_rule: {
      contact_method: { id: "PXPGF42", type: "email_contact_method_reference" },
    }, // Required
  };
};
