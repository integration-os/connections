const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    financial_account: "string", // Required

    // customer: "string",
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // starting_after: "string",
    // status: "canceled",
  };
};