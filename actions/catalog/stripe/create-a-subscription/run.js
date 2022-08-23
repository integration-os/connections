const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    customer,
    add_invoice_items,
    application_fee_percent,
    automatic_tax,
    backdate_start_date,
    billing_cycle_anchor,
    billing_thresholds,
    cancel_at,
    cancel_at_period_end,
    collection_method,
    coupon,
    currency,
    days_until_due,
    default_payment_method,
    default_source,
    default_tax_rates,
    description,
    expand,
    items,
    metadata,
    off_session,
    payment_behavior,
    payment_settings,
    pending_invoice_item_interval,
    promotion_code,
    proration_behavior,
    transfer_data,
    trial_end,
    trial_from_plan,
    trial_period_days,
    items0Billing_thresholdsUsage_gte,
    items0Metadata,
    items0Price,
    items0Price_dataCurrency,
    items0Price_dataProduct,
    items0Price_dataRecurringInterval,
    items0Price_dataRecurringInterval_count,
    items0Price_dataTax_behavior,
    items0Price_dataUnit_amount,
    items0Price_dataUnit_amount_decimal,
    items0Quantity,
    items0Tax_rates0,
    items0Tax_rates1,
    items1Billing_thresholdsUsage_gte,
    items1Metadata,
    items1Price,
    items1Price_dataCurrency,
    items1Price_dataProduct,
    items1Price_dataRecurringInterval,
    items1Price_dataRecurringInterval_count,
    items1Price_dataTax_behavior,
    items1Price_dataUnit_amount,
    items1Price_dataUnit_amount_decimal,
    items1Quantity,
    items1Tax_rates0,
    items1Tax_rates1,
    add_invoice_items0Price,
    add_invoice_items0Price_dataCurrency,
    add_invoice_items0Price_dataProduct,
    add_invoice_items0Price_dataTax_behavior,
    add_invoice_items0Price_dataUnit_amount,
    add_invoice_items0Price_dataUnit_amount_decimal,
    add_invoice_items0Quantity,
    add_invoice_items0Tax_rates0,
    add_invoice_items0Tax_rates1,
    add_invoice_items1Price,
    add_invoice_items1Price_dataCurrency,
    add_invoice_items1Price_dataProduct,
    add_invoice_items1Price_dataTax_behavior,
    add_invoice_items1Price_dataUnit_amount,
    add_invoice_items1Price_dataUnit_amount_decimal,
    add_invoice_items1Quantity,
    add_invoice_items1Tax_rates0,
    add_invoice_items1Tax_rates1,
    automatic_taxEnabled,
    billing_thresholdsAmount_gte,
    billing_thresholdsReset_billing_cycle_anchor,
    default_tax_rates0,
    default_tax_rates1,
    expand0,
    expand1,
    payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
    payment_settingsPayment_method_optionsAcss_debitVerification_method,
    payment_settingsPayment_method_optionsBancontactPreferred_language,
    payment_settingsPayment_method_optionsCardMandate_optionsAmount,
    payment_settingsPayment_method_optionsCardMandate_optionsAmount_type,
    payment_settingsPayment_method_optionsCardMandate_optionsDescription,
    payment_settingsPayment_method_optionsCardRequest_three_d_secure,
    payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
    payment_settingsPayment_method_optionsCustomer_balanceBank_transferType,
    payment_settingsPayment_method_optionsCustomer_balanceFunding_type,
    payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
    payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
    payment_settingsPayment_method_optionsUs_bank_accountVerification_method,
    payment_settingsPayment_method_types0,
    payment_settingsPayment_method_types1,
    payment_settingsSave_default_payment_method,
    pending_invoice_item_intervalInterval,
    pending_invoice_item_intervalInterval_count,
    transfer_dataDestination,
    transfer_dataAmount_percent,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/subscriptions",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        customer,
        ...(add_invoice_items ? { add_invoice_items } : {}),
        ...(application_fee_percent ? { application_fee_percent } : {}),
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(backdate_start_date ? { backdate_start_date } : {}),
        ...(billing_cycle_anchor ? { billing_cycle_anchor } : {}),
        ...(billing_thresholds ? { billing_thresholds } : {}),
        ...(cancel_at ? { cancel_at } : {}),
        ...(cancel_at_period_end ? { cancel_at_period_end } : {}),
        ...(collection_method ? { collection_method } : {}),
        ...(coupon ? { coupon } : {}),
        ...(currency ? { currency } : {}),
        ...(days_until_due ? { days_until_due } : {}),
        ...(default_payment_method ? { default_payment_method } : {}),
        ...(default_source ? { default_source } : {}),
        ...(default_tax_rates ? { default_tax_rates } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(items ? { items } : {}),
        ...(metadata ? { metadata } : {}),
        ...(off_session ? { off_session } : {}),
        ...(payment_behavior ? { payment_behavior } : {}),
        ...(payment_settings ? { payment_settings } : {}),
        ...(pending_invoice_item_interval ? { pending_invoice_item_interval } : {}),
        ...(promotion_code ? { promotion_code } : {}),
        ...(proration_behavior ? { proration_behavior } : {}),
        ...(transfer_data ? { transfer_data } : {}),
        ...(trial_end ? { trial_end } : {}),
        ...(trial_from_plan ? { trial_from_plan } : {}),
        ...(trial_period_days ? { trial_period_days } : {}),
        ...(items0Billing_thresholdsUsage_gte
          ? { "items[0][billing_thresholds][usage_gte]": items0Billing_thresholdsUsage_gte }
          : {}),
        ...(items0Metadata ? { "items[0][metadata]": items0Metadata } : {}),
        ...(items0Price ? { "items[0][price]": items0Price } : {}),
        ...(items0Price_dataCurrency
          ? { "items[0][price_data][currency]": items0Price_dataCurrency }
          : {}),
        ...(items0Price_dataProduct
          ? { "items[0][price_data][product]": items0Price_dataProduct }
          : {}),
        ...(items0Price_dataRecurringInterval
          ? { "items[0][price_data][recurring][interval]": items0Price_dataRecurringInterval }
          : {}),
        ...(items0Price_dataRecurringInterval_count
          ? {
              "items[0][price_data][recurring][interval_count]":
                items0Price_dataRecurringInterval_count,
            }
          : {}),
        ...(items0Price_dataTax_behavior
          ? { "items[0][price_data][tax_behavior]": items0Price_dataTax_behavior }
          : {}),
        ...(items0Price_dataUnit_amount
          ? { "items[0][price_data][unit_amount]": items0Price_dataUnit_amount }
          : {}),
        ...(items0Price_dataUnit_amount_decimal
          ? { "items[0][price_data][unit_amount_decimal]": items0Price_dataUnit_amount_decimal }
          : {}),
        ...(items0Quantity ? { "items[0][quantity]": items0Quantity } : {}),
        ...(items0Tax_rates0 ? { "items[0][tax_rates][0]": items0Tax_rates0 } : {}),
        ...(items0Tax_rates1 ? { "items[0][tax_rates][1]": items0Tax_rates1 } : {}),
        ...(items1Billing_thresholdsUsage_gte
          ? { "items[1][billing_thresholds][usage_gte]": items1Billing_thresholdsUsage_gte }
          : {}),
        ...(items1Metadata ? { "items[1][metadata]": items1Metadata } : {}),
        ...(items1Price ? { "items[1][price]": items1Price } : {}),
        ...(items1Price_dataCurrency
          ? { "items[1][price_data][currency]": items1Price_dataCurrency }
          : {}),
        ...(items1Price_dataProduct
          ? { "items[1][price_data][product]": items1Price_dataProduct }
          : {}),
        ...(items1Price_dataRecurringInterval
          ? { "items[1][price_data][recurring][interval]": items1Price_dataRecurringInterval }
          : {}),
        ...(items1Price_dataRecurringInterval_count
          ? {
              "items[1][price_data][recurring][interval_count]":
                items1Price_dataRecurringInterval_count,
            }
          : {}),
        ...(items1Price_dataTax_behavior
          ? { "items[1][price_data][tax_behavior]": items1Price_dataTax_behavior }
          : {}),
        ...(items1Price_dataUnit_amount
          ? { "items[1][price_data][unit_amount]": items1Price_dataUnit_amount }
          : {}),
        ...(items1Price_dataUnit_amount_decimal
          ? { "items[1][price_data][unit_amount_decimal]": items1Price_dataUnit_amount_decimal }
          : {}),
        ...(items1Quantity ? { "items[1][quantity]": items1Quantity } : {}),
        ...(items1Tax_rates0 ? { "items[1][tax_rates][0]": items1Tax_rates0 } : {}),
        ...(items1Tax_rates1 ? { "items[1][tax_rates][1]": items1Tax_rates1 } : {}),
        ...(add_invoice_items0Price
          ? { "add_invoice_items[0][price]": add_invoice_items0Price }
          : {}),
        ...(add_invoice_items0Price_dataCurrency
          ? { "add_invoice_items[0][price_data][currency]": add_invoice_items0Price_dataCurrency }
          : {}),
        ...(add_invoice_items0Price_dataProduct
          ? { "add_invoice_items[0][price_data][product]": add_invoice_items0Price_dataProduct }
          : {}),
        ...(add_invoice_items0Price_dataTax_behavior
          ? {
              "add_invoice_items[0][price_data][tax_behavior]":
                add_invoice_items0Price_dataTax_behavior,
            }
          : {}),
        ...(add_invoice_items0Price_dataUnit_amount
          ? {
              "add_invoice_items[0][price_data][unit_amount]":
                add_invoice_items0Price_dataUnit_amount,
            }
          : {}),
        ...(add_invoice_items0Price_dataUnit_amount_decimal
          ? {
              "add_invoice_items[0][price_data][unit_amount_decimal]":
                add_invoice_items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(add_invoice_items0Quantity
          ? { "add_invoice_items[0][quantity]": add_invoice_items0Quantity }
          : {}),
        ...(add_invoice_items0Tax_rates0
          ? { "add_invoice_items[0][tax_rates][0]": add_invoice_items0Tax_rates0 }
          : {}),
        ...(add_invoice_items0Tax_rates1
          ? { "add_invoice_items[0][tax_rates][1]": add_invoice_items0Tax_rates1 }
          : {}),
        ...(add_invoice_items1Price
          ? { "add_invoice_items[1][price]": add_invoice_items1Price }
          : {}),
        ...(add_invoice_items1Price_dataCurrency
          ? { "add_invoice_items[1][price_data][currency]": add_invoice_items1Price_dataCurrency }
          : {}),
        ...(add_invoice_items1Price_dataProduct
          ? { "add_invoice_items[1][price_data][product]": add_invoice_items1Price_dataProduct }
          : {}),
        ...(add_invoice_items1Price_dataTax_behavior
          ? {
              "add_invoice_items[1][price_data][tax_behavior]":
                add_invoice_items1Price_dataTax_behavior,
            }
          : {}),
        ...(add_invoice_items1Price_dataUnit_amount
          ? {
              "add_invoice_items[1][price_data][unit_amount]":
                add_invoice_items1Price_dataUnit_amount,
            }
          : {}),
        ...(add_invoice_items1Price_dataUnit_amount_decimal
          ? {
              "add_invoice_items[1][price_data][unit_amount_decimal]":
                add_invoice_items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(add_invoice_items1Quantity
          ? { "add_invoice_items[1][quantity]": add_invoice_items1Quantity }
          : {}),
        ...(add_invoice_items1Tax_rates0
          ? { "add_invoice_items[1][tax_rates][0]": add_invoice_items1Tax_rates0 }
          : {}),
        ...(add_invoice_items1Tax_rates1
          ? { "add_invoice_items[1][tax_rates][1]": add_invoice_items1Tax_rates1 }
          : {}),
        ...(automatic_taxEnabled ? { "automatic_tax[enabled]": automatic_taxEnabled } : {}),
        ...(billing_thresholdsAmount_gte
          ? { "billing_thresholds[amount_gte]": billing_thresholdsAmount_gte }
          : {}),
        ...(billing_thresholdsReset_billing_cycle_anchor
          ? {
              "billing_thresholds[reset_billing_cycle_anchor]":
                billing_thresholdsReset_billing_cycle_anchor,
            }
          : {}),
        ...(default_tax_rates0 ? { "default_tax_rates[0]": default_tax_rates0 } : {}),
        ...(default_tax_rates1 ? { "default_tax_rates[1]": default_tax_rates1 } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type
          ? {
              "payment_settings[payment_method_options][acss_debit][mandate_options][transaction_type]":
                payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsAcss_debitVerification_method
          ? {
              "payment_settings[payment_method_options][acss_debit][verification_method]":
                payment_settingsPayment_method_optionsAcss_debitVerification_method,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsBancontactPreferred_language
          ? {
              "payment_settings[payment_method_options][bancontact][preferred_language]":
                payment_settingsPayment_method_optionsBancontactPreferred_language,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardMandate_optionsAmount
          ? {
              "payment_settings[payment_method_options][card][mandate_options][amount]":
                payment_settingsPayment_method_optionsCardMandate_optionsAmount,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardMandate_optionsAmount_type
          ? {
              "payment_settings[payment_method_options][card][mandate_options][amount_type]":
                payment_settingsPayment_method_optionsCardMandate_optionsAmount_type,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardMandate_optionsDescription
          ? {
              "payment_settings[payment_method_options][card][mandate_options][description]":
                payment_settingsPayment_method_optionsCardMandate_optionsDescription,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardRequest_three_d_secure
          ? {
              "payment_settings[payment_method_options][card][request_three_d_secure]":
                payment_settingsPayment_method_optionsCardRequest_three_d_secure,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry
          ? {
              "payment_settings[payment_method_options][customer_balance][bank_transfer][eu_bank_transfer][country]":
                payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceBank_transferType
          ? {
              "payment_settings[payment_method_options][customer_balance][bank_transfer][type]":
                payment_settingsPayment_method_optionsCustomer_balanceBank_transferType,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceFunding_type
          ? {
              "payment_settings[payment_method_options][customer_balance][funding_type]":
                payment_settingsPayment_method_optionsCustomer_balanceFunding_type,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0
          ? {
              "payment_settings[payment_method_options][us_bank_account][financial_connections][permissions][0]":
                payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1
          ? {
              "payment_settings[payment_method_options][us_bank_account][financial_connections][permissions][1]":
                payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountVerification_method
          ? {
              "payment_settings[payment_method_options][us_bank_account][verification_method]":
                payment_settingsPayment_method_optionsUs_bank_accountVerification_method,
            }
          : {}),
        ...(payment_settingsPayment_method_types0
          ? { "payment_settings[payment_method_types][0]": payment_settingsPayment_method_types0 }
          : {}),
        ...(payment_settingsPayment_method_types1
          ? { "payment_settings[payment_method_types][1]": payment_settingsPayment_method_types1 }
          : {}),
        ...(payment_settingsSave_default_payment_method
          ? {
              "payment_settings[save_default_payment_method]":
                payment_settingsSave_default_payment_method,
            }
          : {}),
        ...(pending_invoice_item_intervalInterval
          ? { "pending_invoice_item_interval[interval]": pending_invoice_item_intervalInterval }
          : {}),
        ...(pending_invoice_item_intervalInterval_count
          ? {
              "pending_invoice_item_interval[interval_count]":
                pending_invoice_item_intervalInterval_count,
            }
          : {}),
        ...(transfer_dataDestination
          ? { "transfer_data[destination]": transfer_dataDestination }
          : {}),
        ...(transfer_dataAmount_percent
          ? { "transfer_data[amount_percent]": transfer_dataAmount_percent }
          : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, customer }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CUSTOMER: "A valid customer field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof customer !== "string") throw new Error(ERRORS.INVALID_CUSTOMER);
};
