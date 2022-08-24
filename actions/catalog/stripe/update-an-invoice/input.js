const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    invoice: "string", // Required

    // account_tax_ids: ["string"],
    // application_fee_amount: "<integer>",
    // auto_advance: "<boolean>",
    // automatic_tax: { enabled: true },
    // collection_method: "<string>",
    // custom_fields: [{ name: "string", value: "string" }],
    // days_until_due: "<integer>",
    // default_payment_method: "<string>",
    // default_source: "<string>",
    // default_tax_rates: ["string"],
    // description: "<string>",
    // discounts: [{ coupon: "string", discount: "string" }],
    // due_date: "<unix-time>",
    // expand: ["string"],
    // footer: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // on_behalf_of: "string",
    // payment_settings: {
    //     payment_method_options: {
    //       acss_debit: {
    //         mandate_options: { transaction_type: "business" },
    //         verification_method: "automatic"
    //       },
    //       bancontact: { preferred_language: "de" },
    //       card: { request_three_d_secure: "any" },
    //       customer_balance: {
    //         bank_transfer: { eu_bank_transfer: { country: "string" }, type: "string" },
    //         funding_type: "string"
    //       },
    //       konbini: {},
    //       us_bank_account: {
    //         financial_connections: { permissions: ["balances"] },
    //         verification_method: "automatic"
    //       }
    //     },
    //     payment_method_types: ["ach_credit_transfer"]
    //   },
    // rendering_options: { amount_tax_display: "" },
    // statement_descriptor: "<string>",
    // transfer_data: { amount: 0, destination: "string" },
    // account_tax_ids0: "<string>",
    // account_tax_ids1: "<string>",
    // automatic_taxEnabled: "<boolean>",
    // custom_fields0Name: "<string>",
    // custom_fields0Value: "<string>",
    // custom_fields1Name: "<string>",
    // custom_fields1Value: "<string>",
    // default_tax_rates0: "<string>",
    // default_tax_rates1: "<string>",
    // discounts0Coupon: "<string>",
    // discounts0Discount: "<string>",
    // discounts1Coupon: "<string>",
    // discounts1Discount: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // payment_settingsDefault_mandate: "<string>",
    // payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type: "<string>",
    // payment_settingsPayment_method_optionsAcss_debitVerification_method: "<string>",
    // payment_settingsPayment_method_optionsBancontactPreferred_language: "<string>",
    // payment_settingsPayment_method_optionsCardInstallmentsEnabled: "<boolean>",
    // payment_settingsPayment_method_optionsCardInstallmentsPlanCount: "<integer>",
    // payment_settingsPayment_method_optionsCardInstallmentsPlanInterval: "<string>",
    // payment_settingsPayment_method_optionsCardInstallmentsPlanType: "<string>",
    // payment_settingsPayment_method_optionsCardRequest_three_d_secure: "<string>",
    // payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry:
    //     "<string>",
    // payment_settingsPayment_method_optionsCustomer_balanceBank_transferType: "<string>",
    // payment_settingsPayment_method_optionsCustomer_balanceFunding_type: "<string>",
    // payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0: "<string>",
    // payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1: "<string>",
    // payment_settingsPayment_method_optionsUs_bank_accountVerification_method: "<string>",
    // payment_settingsPayment_method_types0: "<string>",
    // payment_settingsPayment_method_types1: "<string>",
    // rendering_optionsAmount_tax_display: "<string>",
    // transfer_dataDestination: "<string>",
    // transfer_dataAmount: "<integer>",
  };
};
