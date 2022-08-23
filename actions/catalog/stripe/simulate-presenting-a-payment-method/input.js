const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    reader: "string", // Required

    // card_present: { number: "string" },
    // expand: ["string"],
    // type: "<string>",
    // card_presentNumber: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
