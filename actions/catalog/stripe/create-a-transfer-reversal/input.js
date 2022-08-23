const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    id: "string", // Required

    // amount: "<integer>",
    // description: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // refund_application_fee: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
