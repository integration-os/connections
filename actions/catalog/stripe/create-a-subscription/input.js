const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "<string>", // Required

    // add_invoice_items: [
    //     {
    //       price: "string",
    //       price_data: {
    //         currency: "string",
    //         product: "string",
    //         tax_behavior: "exclusive",
    //         unit_amount: 0,
    //         unit_amount_decimal: "string"
    //       },
    //       quantity: 0,
    //       tax_rates: ["string"]
    //     }
    //   ],
    // application_fee_percent: "<number>",
    // automatic_tax: { enabled: true },
    // backdate_start_date: "<unix-time>",
    // billing_cycle_anchor: "<unix-time>",
    // billing_thresholds: { amount_gte: 0, reset_billing_cycle_anchor: true },
    // cancel_at: "<unix-time>",
    // cancel_at_period_end: "<boolean>",
    // collection_method: "<string>",
    // coupon: "<string>",
    // currency: "<string>",
    // days_until_due: "<integer>",
    // default_payment_method: "<string>",
    // default_source: "<string>",
    // default_tax_rates: ["string"],
    // description: "<string>",
    // expand: ["string"],
    // items: [
    //     {
    //       billing_thresholds: { usage_gte: 0 },
    //       metadata: { property1: "string", property2: "string" },
    //       price: "string",
    //       price_data: {
    //         currency: "string",
    //         product: "string",
    //         recurring: { interval: "day", interval_count: 0 },
    //         tax_behavior: "exclusive",
    //         unit_amount: 0,
    //         unit_amount_decimal: "string"
    //       },
    //       quantity: 0,
    //       tax_rates: ["string"]
    //     }
    //   ],
    // metadata: { property1: "string", property2: "string" },
    // off_session: "<boolean>",
    // payment_behavior: "<string>",
    // payment_settings: {
    //     payment_method_options: {
    //       acss_debit: {
    //         mandate_options: { transaction_type: "business" },
    //         verification_method: "automatic"
    //       },
    //       bancontact: { preferred_language: "de" },
    //       card: {
    //         mandate_options: { amount: 0, amount_type: "fixed", description: "string" },
    //         request_three_d_secure: "any"
    //       },
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
    //     payment_method_types: ["ach_credit_transfer"],
    //     save_default_payment_method: "off"
    //   },
    // pending_invoice_item_interval: { interval: "day", interval_count: 0 },
    // promotion_code: "<string>",
    // proration_behavior: "<string>",
    // transfer_data: { amount_percent: 0, destination: "string" },
    // trial_end: "now",
    // trial_from_plan: "<boolean>",
    // trial_period_days: "<integer>",
    // items0Billing_thresholdsUsage_gte: "<integer>",
    // items0Metadata: "<object>",
    // items0Price: "<string>",
    // items0Price_dataCurrency: "<string>",
    // items0Price_dataProduct: "<string>",
    // items0Price_dataRecurringInterval: "<string>",
    // items0Price_dataRecurringInterval_count: "<integer>",
    // items0Price_dataTax_behavior: "<string>",
    // items0Price_dataUnit_amount: "<integer>",
    // items0Price_dataUnit_amount_decimal: "<decimal>",
    // items0Quantity: "<integer>",
    // items0Tax_rates0: "<string>",
    // items0Tax_rates1: "<string>",
    // items1Billing_thresholdsUsage_gte: "<integer>",
    // items1Metadata: "<object>",
    // items1Price: "<string>",
    // items1Price_dataCurrency: "<string>",
    // items1Price_dataProduct: "<string>",
    // items1Price_dataRecurringInterval: "<string>",
    // items1Price_dataRecurringInterval_count: "<integer>",
    // items1Price_dataTax_behavior: "<string>",
    // items1Price_dataUnit_amount: "<integer>",
    // items1Price_dataUnit_amount_decimal: "<decimal>",
    // items1Quantity: "<integer>",
    // items1Tax_rates0: "<string>",
    // items1Tax_rates1: "<string>",
    // add_invoice_items0Price: "<string>",
    // add_invoice_items0Price_dataCurrency: "<string>",
    // add_invoice_items0Price_dataProduct: "<string>",
    // add_invoice_items0Price_dataTax_behavior: "<string>",
    // add_invoice_items0Price_dataUnit_amount: "<integer>",
    // add_invoice_items0Price_dataUnit_amount_decimal: "<decimal>",
    // add_invoice_items0Quantity: "<integer>",
    // add_invoice_items0Tax_rates0: "<string>",
    // add_invoice_items0Tax_rates1: "<string>",
    // add_invoice_items1Price: "<string>",
    // add_invoice_items1Price_dataCurrency: "<string>",
    // add_invoice_items1Price_dataProduct: "<string>",
    // add_invoice_items1Price_dataTax_behavior: "<string>",
    // add_invoice_items1Price_dataUnit_amount: "<integer>",
    // add_invoice_items1Price_dataUnit_amount_decimal: "<decimal>",
    // add_invoice_items1Quantity: "<integer>",
    // add_invoice_items1Tax_rates0: "<string>",
    // add_invoice_items1Tax_rates1: "<string>",
    // automatic_taxEnabled: "<boolean>",
    // billing_thresholdsAmount_gte: "<integer>",
    // billing_thresholdsReset_billing_cycle_anchor: "<boolean>",
    // default_tax_rates0: "<string>",
    // default_tax_rates1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type: "<string>",
    // payment_settingsPayment_method_optionsAcss_debitVerification_method: "<string>",
    // payment_settingsPayment_method_optionsBancontactPreferred_language: "<string>",
    // payment_settingsPayment_method_optionsCardMandate_optionsAmount: "<integer>",
    // payment_settingsPayment_method_optionsCardMandate_optionsAmount_type: "<string>",
    // payment_settingsPayment_method_optionsCardMandate_optionsDescription: "<string>",
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
    // payment_settingsSave_default_payment_method: "<string>",
    // pending_invoice_item_intervalInterval: "<string>",
    // pending_invoice_item_intervalInterval_count: "<integer>",
    // transfer_dataDestination: "<string>",
    // transfer_dataAmount_percent: "<number>",
  };
};
