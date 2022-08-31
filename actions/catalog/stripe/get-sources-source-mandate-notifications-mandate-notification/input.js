const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    mandate_notification: "string", // Required
    source: "string", // Required

    // expand: ["string"],
  };
};
