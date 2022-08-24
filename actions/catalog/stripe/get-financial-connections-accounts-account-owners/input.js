const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account: "string", // Required
    ownership: "string", // Required

    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // starting_after: "string",
  };
};
