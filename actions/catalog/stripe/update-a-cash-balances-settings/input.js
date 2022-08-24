const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "string", // Required

    // expand: ["string"],
    // settings: { reconciliation_mode: "automatic" },
    // expand0: "<string>",
    // expand1: "<string>",
    // settingsReconciliation_mode: "<string>",
  };
};
