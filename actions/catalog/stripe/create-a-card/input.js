const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    currency: "<string>", // Required
    type: "<string>", // Required

    // cardholder: "<string>",
    // expand: ["string"],
    // financial_account: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // replacement_for: "<string>",
    // replacement_reason: "<string>",
    // shipping: {
    //     address: {
    //       city: "string",
    //       country: "string",
    //       line1: "string",
    //       line2: "string",
    //       postal_code: "string",
    //       state: "string"
    //     },
    //     name: "string",
    //     service: "express",
    //     type: "bulk"
    //   },
    // spending_controls: {
    //     allowed_categories: ["ac_refrigeration_repair"],
    //     blocked_categories: ["ac_refrigeration_repair"],
    //     spending_limits: [{ amount: 0, categories: ["ac_refrigeration_repair"], interval: "all_time" }]
    //   },
    // status: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // shippingAddressCity: "<string>",
    // shippingAddressCountry: "<string>",
    // shippingAddressLine1: "<string>",
    // shippingAddressPostal_code: "<string>",
    // shippingAddressLine2: "<string>",
    // shippingAddressState: "<string>",
    // shippingName: "<string>",
    // shippingService: "<string>",
    // shippingType: "<string>",
    // spending_controlsAllowed_categories0: "<string>",
    // spending_controlsAllowed_categories1: "<string>",
    // spending_controlsBlocked_categories0: "<string>",
    // spending_controlsBlocked_categories1: "<string>",
    // spending_controlsSpending_limits0Amount: "<integer>",
    // spending_controlsSpending_limits0Interval: "<string>",
    // spending_controlsSpending_limits0Categories0: "<string>",
    // spending_controlsSpending_limits0Categories1: "<string>",
    // spending_controlsSpending_limits1Amount: "<integer>",
    // spending_controlsSpending_limits1Interval: "<string>",
    // spending_controlsSpending_limits1Categories0: "<string>",
    // spending_controlsSpending_limits1Categories1: "<string>",
  };
};
