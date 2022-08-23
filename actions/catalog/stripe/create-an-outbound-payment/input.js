const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: "<integer>", // Required
    currency: "<string>", // Required
    financial_account: "<string>", // Required

    // customer: "<string>",
    // description: "<string>",
    // destination_payment_method: "<string>",
    // destination_payment_method_data: {
    //     billing_details: {
    //       address: {
    //         city: "string",
    //         country: "string",
    //         line1: "string",
    //         line2: "string",
    //         postal_code: "string",
    //         state: "string"
    //       },
    //       email: "string",
    //       name: "string",
    //       phone: "string"
    //     },
    //     financial_account: "string",
    //     metadata: { property1: "string", property2: "string" },
    //     type: "financial_account",
    //     us_bank_account: {
    //       account_holder_type: "company",
    //       account_number: "string",
    //       account_type: "checking",
    //       financial_connections_account: "string",
    //       routing_number: "string"
    //     }
    //   },
    // destination_payment_method_options: { us_bank_account: { network: "ach" } },
    // end_user_details: { ip_address: "string", present: true },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // statement_descriptor: "<string>",
    // destination_payment_method_dataType: "<string>",
    // destination_payment_method_dataBilling_detailsAddressCity: "<string>",
    // destination_payment_method_dataBilling_detailsAddressCountry: "<string>",
    // destination_payment_method_dataBilling_detailsAddressLine1: "<string>",
    // destination_payment_method_dataBilling_detailsAddressLine2: "<string>",
    // destination_payment_method_dataBilling_detailsAddressPostal_code: "<string>",
    // destination_payment_method_dataBilling_detailsAddressState: "<string>",
    // destination_payment_method_dataBilling_detailsEmail: "<string>",
    // destination_payment_method_dataBilling_detailsName: "<string>",
    // destination_payment_method_dataBilling_detailsPhone: "<string>",
    // destination_payment_method_dataFinancial_account: "<string>",
    // destination_payment_method_dataMetadata: "<object>",
    // destination_payment_method_dataUs_bank_accountAccount_holder_type: "<string>",
    // destination_payment_method_dataUs_bank_accountAccount_number: "<string>",
    // destination_payment_method_dataUs_bank_accountAccount_type: "<string>",
    // destination_payment_method_dataUs_bank_accountFinancial_connections_account: "<string>",
    // destination_payment_method_dataUs_bank_accountRouting_number: "<string>",
    // destination_payment_method_optionsUs_bank_accountNetwork: "<string>",
    // end_user_detailsPresent: "<boolean>",
    // end_user_detailsIp_address: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
