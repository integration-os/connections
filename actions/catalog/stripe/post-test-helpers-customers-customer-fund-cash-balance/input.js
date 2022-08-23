const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "string", // Required
    amount: 0, // Required
    currency: "string", // Required

    // expand: ["string"],
    // reference: "string",
  };
};
