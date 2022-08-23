const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    billing: {
      address: {
        city: "string",
        country: "string",
        line1: "string",
        line2: "string",
        postal_code: "string",
        state: "string",
      },
    }, // Required
    name: "<string>", // Required
    type: "<string>", // Required

    // company: { tax_id: "string" },
    // email: "<string>",
    // expand: ["string"],
    // individual: {
    //     dob: { day: 0, month: 0, year: 0 },
    //     first_name: "string",
    //     last_name: "string",
    //     verification: { document: { back: "string", front: "string" } }
    //   },
    // metadata: { property1: "string", property2: "string" },
    // phone_number: "<string>",
    // spending_controls: {
    //     allowed_categories: ["ac_refrigeration_repair"],
    //     blocked_categories: ["ac_refrigeration_repair"],
    //     spending_limits: [{ amount: 0, categories: ["ac_refrigeration_repair"], interval: "all_time" }],
    //     spending_limits_currency: "string"
    //   },
    // status: "<string>",
    // billingAddressCity: "<string>",
    // billingAddressCountry: "<string>",
    // billingAddressLine1: "<string>",
    // billingAddressPostal_code: "<string>",
    // billingAddressLine2: "<string>",
    // billingAddressState: "<string>",
    // companyTax_id: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // individualFirst_name: "<string>",
    // individualLast_name: "<string>",
    // individualDobDay: "<integer>",
    // individualDobMonth: "<integer>",
    // individualDobYear: "<integer>",
    // individualVerificationDocumentBack: "<string>",
    // individualVerificationDocumentFront: "<string>",
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
    // spending_controlsSpending_limits_currency: "<string>",
  };
};
