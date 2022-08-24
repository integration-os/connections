const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    charge: "string", // Required

    // customer: "<string>",
    // description: "<string>",
    // expand: ["string"],
    // fraud_details: { user_report: "" },
    // metadata: { property1: "string", property2: "string" },
    // receipt_email: "<string>",
    // shipping: {
    //     address: {
    //       city: "string",
    //       country: "string",
    //       line1: "string",
    //       line2: "string",
    //       postal_code: "string",
    //       state: "string"
    //     },
    //     carrier: "string",
    //     name: "string",
    //     phone: "string",
    //     tracking_number: "string"
    //   },
    // transfer_group: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // fraud_detailsUser_report: "<string>",
    // shippingAddressCity: "<string>",
    // shippingAddressCountry: "<string>",
    // shippingAddressLine1: "<string>",
    // shippingAddressLine2: "<string>",
    // shippingAddressPostal_code: "<string>",
    // shippingAddressState: "<string>",
    // shippingName: "<string>",
    // shippingCarrier: "<string>",
    // shippingPhone: "<string>",
    // shippingTracking_number: "<string>",
  };
};
