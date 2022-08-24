const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: "<integer>", // Required
    currency: "<string>", // Required
    financial_account: "<string>", // Required
    origin_payment_method: "<string>", // Required

    // description: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // statement_descriptor: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
