const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required

    // active: true,
    // created: { gt: 0, gte: 0, lt: 0, lte: 0 },
    // currency: "string",
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // lookup_keys: ["string"],
    // product: "string",
    // recurring: { interval: "day", usage_type: "licensed" },
    // starting_after: "string",
    // type: "one_time",
  };
};