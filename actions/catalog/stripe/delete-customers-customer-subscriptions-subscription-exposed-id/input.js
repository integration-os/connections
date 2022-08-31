const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "string", // Required
    subscription_exposed_id: "string", // Required

    // expand: ["string"],
    // invoice_now: true,
    // prorate: true,
  };
};
