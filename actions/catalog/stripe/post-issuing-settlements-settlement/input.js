const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    settlement: "string", // Required

    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
  };
};
