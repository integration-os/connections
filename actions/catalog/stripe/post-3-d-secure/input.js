const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: 0, // Required
    currency: "string", // Required
    return_url: "string", // Required

    // card: "string",
    // customer: "string",
    // expand: ["string"],
  };
};
