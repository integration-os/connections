const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    id: "string", // Required

    // expand: ["string"],
    // failure_details: { code: "account_closed" },
    // expand0: "<string>",
    // expand1: "<string>",
    // failure_detailsCode: "<string>",
  };
};
