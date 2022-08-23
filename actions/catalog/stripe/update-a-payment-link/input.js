const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    payment_link: "string", // Required

    // active: "<boolean>",
    // after_completion: {
    //     hosted_confirmation: { custom_message: "string" },
    //     redirect: { url: "string" },
    //     type: "hosted_confirmation"
    //   },
    // allow_promotion_codes: "<boolean>",
    // automatic_tax: { enabled: true },
    // billing_address_collection: "<string>",
    // customer_creation: "<string>",
    // expand: ["string"],
    // line_items: [
    //     { adjustable_quantity: { enabled: true, maximum: 0, minimum: 0 }, id: "string", quantity: 0 }
    //   ],
    // metadata: { property1: "string", property2: "string" },
    // payment_method_types: ["affirm"],
    // shipping_address_collection: { allowed_countries: ["AC"] },
    // after_completionType: "<string>",
    // after_completionHosted_confirmationCustom_message: "<string>",
    // after_completionRedirectUrl: "<string>",
    // automatic_taxEnabled: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
    // line_items0Id: "<string>",
    // line_items0Adjustable_quantityEnabled: "<boolean>",
    // line_items0Adjustable_quantityMaximum: "<integer>",
    // line_items0Adjustable_quantityMinimum: "<integer>",
    // line_items0Quantity: "<integer>",
    // line_items1Id: "<string>",
    // line_items1Adjustable_quantityEnabled: "<boolean>",
    // line_items1Adjustable_quantityMaximum: "<integer>",
    // line_items1Adjustable_quantityMinimum: "<integer>",
    // line_items1Quantity: "<integer>",
    // payment_method_types0: "<string>",
    // payment_method_types1: "<string>",
    // shipping_address_collectionAllowed_countries0: "<string>",
    // shipping_address_collectionAllowed_countries1: "<string>",
  };
};
