const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    schedule,
    default_settings,
    end_behavior,
    expand,
    metadata,
    phases,
    proration_behavior,
    default_settingsApplication_fee_percent,
    default_settingsAutomatic_taxEnabled,
    default_settingsBilling_cycle_anchor,
    default_settingsBilling_thresholdsAmount_gte,
    default_settingsBilling_thresholdsReset_billing_cycle_anchor,
    default_settingsCollection_method,
    default_settingsDefault_payment_method,
    default_settingsInvoice_settingsDays_until_due,
    default_settingsTransfer_dataDestination,
    default_settingsTransfer_dataAmount_percent,
    expand0,
    expand1,
    phases0Items0Billing_thresholdsUsage_gte,
    phases0Items0Price,
    phases0Items0Price_dataCurrency,
    phases0Items0Price_dataProduct,
    phases0Items0Price_dataRecurringInterval,
    phases0Items0Price_dataRecurringInterval_count,
    phases0Items0Price_dataTax_behavior,
    phases0Items0Price_dataUnit_amount,
    phases0Items0Price_dataUnit_amount_decimal,
    phases0Items0Quantity,
    phases0Items0Tax_rates0,
    phases0Items0Tax_rates1,
    phases0Items1Billing_thresholdsUsage_gte,
    phases0Items1Price,
    phases0Items1Price_dataCurrency,
    phases0Items1Price_dataProduct,
    phases0Items1Price_dataRecurringInterval,
    phases0Items1Price_dataRecurringInterval_count,
    phases0Items1Price_dataTax_behavior,
    phases0Items1Price_dataUnit_amount,
    phases0Items1Price_dataUnit_amount_decimal,
    phases0Items1Quantity,
    phases0Items1Tax_rates0,
    phases0Items1Tax_rates1,
    phases0Add_invoice_items0Price,
    phases0Add_invoice_items0Price_dataCurrency,
    phases0Add_invoice_items0Price_dataProduct,
    phases0Add_invoice_items0Price_dataTax_behavior,
    phases0Add_invoice_items0Price_dataUnit_amount,
    phases0Add_invoice_items0Price_dataUnit_amount_decimal,
    phases0Add_invoice_items0Quantity,
    phases0Add_invoice_items0Tax_rates0,
    phases0Add_invoice_items0Tax_rates1,
    phases0Add_invoice_items1Price,
    phases0Add_invoice_items1Price_dataCurrency,
    phases0Add_invoice_items1Price_dataProduct,
    phases0Add_invoice_items1Price_dataTax_behavior,
    phases0Add_invoice_items1Price_dataUnit_amount,
    phases0Add_invoice_items1Price_dataUnit_amount_decimal,
    phases0Add_invoice_items1Quantity,
    phases0Add_invoice_items1Tax_rates0,
    phases0Add_invoice_items1Tax_rates1,
    phases0Application_fee_percent,
    phases0Automatic_taxEnabled,
    phases0Billing_cycle_anchor,
    phases0Billing_thresholdsAmount_gte,
    phases0Billing_thresholdsReset_billing_cycle_anchor,
    phases0Collection_method,
    phases0Coupon,
    phases0Currency,
    phases0Default_payment_method,
    phases0Default_tax_rates0,
    phases0Default_tax_rates1,
    phases0End_date,
    phases0Invoice_settingsDays_until_due,
    phases0Iterations,
    phases0Metadata,
    phases0Proration_behavior,
    phases0Start_date,
    phases0Transfer_dataDestination,
    phases0Transfer_dataAmount_percent,
    phases0Trial,
    phases0Trial_end,
    phases1Items0Billing_thresholdsUsage_gte,
    phases1Items0Price,
    phases1Items0Price_dataCurrency,
    phases1Items0Price_dataProduct,
    phases1Items0Price_dataRecurringInterval,
    phases1Items0Price_dataRecurringInterval_count,
    phases1Items0Price_dataTax_behavior,
    phases1Items0Price_dataUnit_amount,
    phases1Items0Price_dataUnit_amount_decimal,
    phases1Items0Quantity,
    phases1Items0Tax_rates0,
    phases1Items0Tax_rates1,
    phases1Items1Billing_thresholdsUsage_gte,
    phases1Items1Price,
    phases1Items1Price_dataCurrency,
    phases1Items1Price_dataProduct,
    phases1Items1Price_dataRecurringInterval,
    phases1Items1Price_dataRecurringInterval_count,
    phases1Items1Price_dataTax_behavior,
    phases1Items1Price_dataUnit_amount,
    phases1Items1Price_dataUnit_amount_decimal,
    phases1Items1Quantity,
    phases1Items1Tax_rates0,
    phases1Items1Tax_rates1,
    phases1Add_invoice_items0Price,
    phases1Add_invoice_items0Price_dataCurrency,
    phases1Add_invoice_items0Price_dataProduct,
    phases1Add_invoice_items0Price_dataTax_behavior,
    phases1Add_invoice_items0Price_dataUnit_amount,
    phases1Add_invoice_items0Price_dataUnit_amount_decimal,
    phases1Add_invoice_items0Quantity,
    phases1Add_invoice_items0Tax_rates0,
    phases1Add_invoice_items0Tax_rates1,
    phases1Add_invoice_items1Price,
    phases1Add_invoice_items1Price_dataCurrency,
    phases1Add_invoice_items1Price_dataProduct,
    phases1Add_invoice_items1Price_dataTax_behavior,
    phases1Add_invoice_items1Price_dataUnit_amount,
    phases1Add_invoice_items1Price_dataUnit_amount_decimal,
    phases1Add_invoice_items1Quantity,
    phases1Add_invoice_items1Tax_rates0,
    phases1Add_invoice_items1Tax_rates1,
    phases1Application_fee_percent,
    phases1Automatic_taxEnabled,
    phases1Billing_cycle_anchor,
    phases1Billing_thresholdsAmount_gte,
    phases1Billing_thresholdsReset_billing_cycle_anchor,
    phases1Collection_method,
    phases1Coupon,
    phases1Currency,
    phases1Default_payment_method,
    phases1Default_tax_rates0,
    phases1Default_tax_rates1,
    phases1End_date,
    phases1Invoice_settingsDays_until_due,
    phases1Iterations,
    phases1Metadata,
    phases1Proration_behavior,
    phases1Start_date,
    phases1Transfer_dataDestination,
    phases1Transfer_dataAmount_percent,
    phases1Trial,
    phases1Trial_end,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/subscription_schedules/${schedule}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(default_settings ? { default_settings } : {}),
        ...(end_behavior ? { end_behavior } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(phases ? { phases } : {}),
        ...(proration_behavior ? { proration_behavior } : {}),
        ...(default_settingsApplication_fee_percent
          ? { "default_settings[application_fee_percent]": default_settingsApplication_fee_percent }
          : {}),
        ...(default_settingsAutomatic_taxEnabled
          ? { "default_settings[automatic_tax][enabled]": default_settingsAutomatic_taxEnabled }
          : {}),
        ...(default_settingsBilling_cycle_anchor
          ? { "default_settings[billing_cycle_anchor]": default_settingsBilling_cycle_anchor }
          : {}),
        ...(default_settingsBilling_thresholdsAmount_gte
          ? {
              "default_settings[billing_thresholds][amount_gte]":
                default_settingsBilling_thresholdsAmount_gte,
            }
          : {}),
        ...(default_settingsBilling_thresholdsReset_billing_cycle_anchor
          ? {
              "default_settings[billing_thresholds][reset_billing_cycle_anchor]":
                default_settingsBilling_thresholdsReset_billing_cycle_anchor,
            }
          : {}),
        ...(default_settingsCollection_method
          ? { "default_settings[collection_method]": default_settingsCollection_method }
          : {}),
        ...(default_settingsDefault_payment_method
          ? { "default_settings[default_payment_method]": default_settingsDefault_payment_method }
          : {}),
        ...(default_settingsInvoice_settingsDays_until_due
          ? {
              "default_settings[invoice_settings][days_until_due]":
                default_settingsInvoice_settingsDays_until_due,
            }
          : {}),
        ...(default_settingsTransfer_dataDestination
          ? {
              "default_settings[transfer_data][destination]":
                default_settingsTransfer_dataDestination,
            }
          : {}),
        ...(default_settingsTransfer_dataAmount_percent
          ? {
              "default_settings[transfer_data][amount_percent]":
                default_settingsTransfer_dataAmount_percent,
            }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(phases0Items0Billing_thresholdsUsage_gte
          ? {
              "phases[0][items][0][billing_thresholds][usage_gte]":
                phases0Items0Billing_thresholdsUsage_gte,
            }
          : {}),
        ...(phases0Items0Price ? { "phases[0][items][0][price]": phases0Items0Price } : {}),
        ...(phases0Items0Price_dataCurrency
          ? { "phases[0][items][0][price_data][currency]": phases0Items0Price_dataCurrency }
          : {}),
        ...(phases0Items0Price_dataProduct
          ? { "phases[0][items][0][price_data][product]": phases0Items0Price_dataProduct }
          : {}),
        ...(phases0Items0Price_dataRecurringInterval
          ? {
              "phases[0][items][0][price_data][recurring][interval]":
                phases0Items0Price_dataRecurringInterval,
            }
          : {}),
        ...(phases0Items0Price_dataRecurringInterval_count
          ? {
              "phases[0][items][0][price_data][recurring][interval_count]":
                phases0Items0Price_dataRecurringInterval_count,
            }
          : {}),
        ...(phases0Items0Price_dataTax_behavior
          ? { "phases[0][items][0][price_data][tax_behavior]": phases0Items0Price_dataTax_behavior }
          : {}),
        ...(phases0Items0Price_dataUnit_amount
          ? { "phases[0][items][0][price_data][unit_amount]": phases0Items0Price_dataUnit_amount }
          : {}),
        ...(phases0Items0Price_dataUnit_amount_decimal
          ? {
              "phases[0][items][0][price_data][unit_amount_decimal]":
                phases0Items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases0Items0Quantity
          ? { "phases[0][items][0][quantity]": phases0Items0Quantity }
          : {}),
        ...(phases0Items0Tax_rates0
          ? { "phases[0][items][0][tax_rates][0]": phases0Items0Tax_rates0 }
          : {}),
        ...(phases0Items0Tax_rates1
          ? { "phases[0][items][0][tax_rates][1]": phases0Items0Tax_rates1 }
          : {}),
        ...(phases0Items1Billing_thresholdsUsage_gte
          ? {
              "phases[0][items][1][billing_thresholds][usage_gte]":
                phases0Items1Billing_thresholdsUsage_gte,
            }
          : {}),
        ...(phases0Items1Price ? { "phases[0][items][1][price]": phases0Items1Price } : {}),
        ...(phases0Items1Price_dataCurrency
          ? { "phases[0][items][1][price_data][currency]": phases0Items1Price_dataCurrency }
          : {}),
        ...(phases0Items1Price_dataProduct
          ? { "phases[0][items][1][price_data][product]": phases0Items1Price_dataProduct }
          : {}),
        ...(phases0Items1Price_dataRecurringInterval
          ? {
              "phases[0][items][1][price_data][recurring][interval]":
                phases0Items1Price_dataRecurringInterval,
            }
          : {}),
        ...(phases0Items1Price_dataRecurringInterval_count
          ? {
              "phases[0][items][1][price_data][recurring][interval_count]":
                phases0Items1Price_dataRecurringInterval_count,
            }
          : {}),
        ...(phases0Items1Price_dataTax_behavior
          ? { "phases[0][items][1][price_data][tax_behavior]": phases0Items1Price_dataTax_behavior }
          : {}),
        ...(phases0Items1Price_dataUnit_amount
          ? { "phases[0][items][1][price_data][unit_amount]": phases0Items1Price_dataUnit_amount }
          : {}),
        ...(phases0Items1Price_dataUnit_amount_decimal
          ? {
              "phases[0][items][1][price_data][unit_amount_decimal]":
                phases0Items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases0Items1Quantity
          ? { "phases[0][items][1][quantity]": phases0Items1Quantity }
          : {}),
        ...(phases0Items1Tax_rates0
          ? { "phases[0][items][1][tax_rates][0]": phases0Items1Tax_rates0 }
          : {}),
        ...(phases0Items1Tax_rates1
          ? { "phases[0][items][1][tax_rates][1]": phases0Items1Tax_rates1 }
          : {}),
        ...(phases0Add_invoice_items0Price
          ? { "phases[0][add_invoice_items][0][price]": phases0Add_invoice_items0Price }
          : {}),
        ...(phases0Add_invoice_items0Price_dataCurrency
          ? {
              "phases[0][add_invoice_items][0][price_data][currency]":
                phases0Add_invoice_items0Price_dataCurrency,
            }
          : {}),
        ...(phases0Add_invoice_items0Price_dataProduct
          ? {
              "phases[0][add_invoice_items][0][price_data][product]":
                phases0Add_invoice_items0Price_dataProduct,
            }
          : {}),
        ...(phases0Add_invoice_items0Price_dataTax_behavior
          ? {
              "phases[0][add_invoice_items][0][price_data][tax_behavior]":
                phases0Add_invoice_items0Price_dataTax_behavior,
            }
          : {}),
        ...(phases0Add_invoice_items0Price_dataUnit_amount
          ? {
              "phases[0][add_invoice_items][0][price_data][unit_amount]":
                phases0Add_invoice_items0Price_dataUnit_amount,
            }
          : {}),
        ...(phases0Add_invoice_items0Price_dataUnit_amount_decimal
          ? {
              "phases[0][add_invoice_items][0][price_data][unit_amount_decimal]":
                phases0Add_invoice_items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases0Add_invoice_items0Quantity
          ? { "phases[0][add_invoice_items][0][quantity]": phases0Add_invoice_items0Quantity }
          : {}),
        ...(phases0Add_invoice_items0Tax_rates0
          ? { "phases[0][add_invoice_items][0][tax_rates][0]": phases0Add_invoice_items0Tax_rates0 }
          : {}),
        ...(phases0Add_invoice_items0Tax_rates1
          ? { "phases[0][add_invoice_items][0][tax_rates][1]": phases0Add_invoice_items0Tax_rates1 }
          : {}),
        ...(phases0Add_invoice_items1Price
          ? { "phases[0][add_invoice_items][1][price]": phases0Add_invoice_items1Price }
          : {}),
        ...(phases0Add_invoice_items1Price_dataCurrency
          ? {
              "phases[0][add_invoice_items][1][price_data][currency]":
                phases0Add_invoice_items1Price_dataCurrency,
            }
          : {}),
        ...(phases0Add_invoice_items1Price_dataProduct
          ? {
              "phases[0][add_invoice_items][1][price_data][product]":
                phases0Add_invoice_items1Price_dataProduct,
            }
          : {}),
        ...(phases0Add_invoice_items1Price_dataTax_behavior
          ? {
              "phases[0][add_invoice_items][1][price_data][tax_behavior]":
                phases0Add_invoice_items1Price_dataTax_behavior,
            }
          : {}),
        ...(phases0Add_invoice_items1Price_dataUnit_amount
          ? {
              "phases[0][add_invoice_items][1][price_data][unit_amount]":
                phases0Add_invoice_items1Price_dataUnit_amount,
            }
          : {}),
        ...(phases0Add_invoice_items1Price_dataUnit_amount_decimal
          ? {
              "phases[0][add_invoice_items][1][price_data][unit_amount_decimal]":
                phases0Add_invoice_items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases0Add_invoice_items1Quantity
          ? { "phases[0][add_invoice_items][1][quantity]": phases0Add_invoice_items1Quantity }
          : {}),
        ...(phases0Add_invoice_items1Tax_rates0
          ? { "phases[0][add_invoice_items][1][tax_rates][0]": phases0Add_invoice_items1Tax_rates0 }
          : {}),
        ...(phases0Add_invoice_items1Tax_rates1
          ? { "phases[0][add_invoice_items][1][tax_rates][1]": phases0Add_invoice_items1Tax_rates1 }
          : {}),
        ...(phases0Application_fee_percent
          ? { "phases[0][application_fee_percent]": phases0Application_fee_percent }
          : {}),
        ...(phases0Automatic_taxEnabled
          ? { "phases[0][automatic_tax][enabled]": phases0Automatic_taxEnabled }
          : {}),
        ...(phases0Billing_cycle_anchor
          ? { "phases[0][billing_cycle_anchor]": phases0Billing_cycle_anchor }
          : {}),
        ...(phases0Billing_thresholdsAmount_gte
          ? { "phases[0][billing_thresholds][amount_gte]": phases0Billing_thresholdsAmount_gte }
          : {}),
        ...(phases0Billing_thresholdsReset_billing_cycle_anchor
          ? {
              "phases[0][billing_thresholds][reset_billing_cycle_anchor]":
                phases0Billing_thresholdsReset_billing_cycle_anchor,
            }
          : {}),
        ...(phases0Collection_method
          ? { "phases[0][collection_method]": phases0Collection_method }
          : {}),
        ...(phases0Coupon ? { "phases[0][coupon]": phases0Coupon } : {}),
        ...(phases0Currency ? { "phases[0][currency]": phases0Currency } : {}),
        ...(phases0Default_payment_method
          ? { "phases[0][default_payment_method]": phases0Default_payment_method }
          : {}),
        ...(phases0Default_tax_rates0
          ? { "phases[0][default_tax_rates][0]": phases0Default_tax_rates0 }
          : {}),
        ...(phases0Default_tax_rates1
          ? { "phases[0][default_tax_rates][1]": phases0Default_tax_rates1 }
          : {}),
        ...(phases0End_date ? { "phases[0][end_date]": phases0End_date } : {}),
        ...(phases0Invoice_settingsDays_until_due
          ? { "phases[0][invoice_settings][days_until_due]": phases0Invoice_settingsDays_until_due }
          : {}),
        ...(phases0Iterations ? { "phases[0][iterations]": phases0Iterations } : {}),
        ...(phases0Metadata ? { "phases[0][metadata]": phases0Metadata } : {}),
        ...(phases0Proration_behavior
          ? { "phases[0][proration_behavior]": phases0Proration_behavior }
          : {}),
        ...(phases0Start_date ? { "phases[0][start_date]": phases0Start_date } : {}),
        ...(phases0Transfer_dataDestination
          ? { "phases[0][transfer_data][destination]": phases0Transfer_dataDestination }
          : {}),
        ...(phases0Transfer_dataAmount_percent
          ? { "phases[0][transfer_data][amount_percent]": phases0Transfer_dataAmount_percent }
          : {}),
        ...(phases0Trial ? { "phases[0][trial]": phases0Trial } : {}),
        ...(phases0Trial_end ? { "phases[0][trial_end]": phases0Trial_end } : {}),
        ...(phases1Items0Billing_thresholdsUsage_gte
          ? {
              "phases[1][items][0][billing_thresholds][usage_gte]":
                phases1Items0Billing_thresholdsUsage_gte,
            }
          : {}),
        ...(phases1Items0Price ? { "phases[1][items][0][price]": phases1Items0Price } : {}),
        ...(phases1Items0Price_dataCurrency
          ? { "phases[1][items][0][price_data][currency]": phases1Items0Price_dataCurrency }
          : {}),
        ...(phases1Items0Price_dataProduct
          ? { "phases[1][items][0][price_data][product]": phases1Items0Price_dataProduct }
          : {}),
        ...(phases1Items0Price_dataRecurringInterval
          ? {
              "phases[1][items][0][price_data][recurring][interval]":
                phases1Items0Price_dataRecurringInterval,
            }
          : {}),
        ...(phases1Items0Price_dataRecurringInterval_count
          ? {
              "phases[1][items][0][price_data][recurring][interval_count]":
                phases1Items0Price_dataRecurringInterval_count,
            }
          : {}),
        ...(phases1Items0Price_dataTax_behavior
          ? { "phases[1][items][0][price_data][tax_behavior]": phases1Items0Price_dataTax_behavior }
          : {}),
        ...(phases1Items0Price_dataUnit_amount
          ? { "phases[1][items][0][price_data][unit_amount]": phases1Items0Price_dataUnit_amount }
          : {}),
        ...(phases1Items0Price_dataUnit_amount_decimal
          ? {
              "phases[1][items][0][price_data][unit_amount_decimal]":
                phases1Items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases1Items0Quantity
          ? { "phases[1][items][0][quantity]": phases1Items0Quantity }
          : {}),
        ...(phases1Items0Tax_rates0
          ? { "phases[1][items][0][tax_rates][0]": phases1Items0Tax_rates0 }
          : {}),
        ...(phases1Items0Tax_rates1
          ? { "phases[1][items][0][tax_rates][1]": phases1Items0Tax_rates1 }
          : {}),
        ...(phases1Items1Billing_thresholdsUsage_gte
          ? {
              "phases[1][items][1][billing_thresholds][usage_gte]":
                phases1Items1Billing_thresholdsUsage_gte,
            }
          : {}),
        ...(phases1Items1Price ? { "phases[1][items][1][price]": phases1Items1Price } : {}),
        ...(phases1Items1Price_dataCurrency
          ? { "phases[1][items][1][price_data][currency]": phases1Items1Price_dataCurrency }
          : {}),
        ...(phases1Items1Price_dataProduct
          ? { "phases[1][items][1][price_data][product]": phases1Items1Price_dataProduct }
          : {}),
        ...(phases1Items1Price_dataRecurringInterval
          ? {
              "phases[1][items][1][price_data][recurring][interval]":
                phases1Items1Price_dataRecurringInterval,
            }
          : {}),
        ...(phases1Items1Price_dataRecurringInterval_count
          ? {
              "phases[1][items][1][price_data][recurring][interval_count]":
                phases1Items1Price_dataRecurringInterval_count,
            }
          : {}),
        ...(phases1Items1Price_dataTax_behavior
          ? { "phases[1][items][1][price_data][tax_behavior]": phases1Items1Price_dataTax_behavior }
          : {}),
        ...(phases1Items1Price_dataUnit_amount
          ? { "phases[1][items][1][price_data][unit_amount]": phases1Items1Price_dataUnit_amount }
          : {}),
        ...(phases1Items1Price_dataUnit_amount_decimal
          ? {
              "phases[1][items][1][price_data][unit_amount_decimal]":
                phases1Items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases1Items1Quantity
          ? { "phases[1][items][1][quantity]": phases1Items1Quantity }
          : {}),
        ...(phases1Items1Tax_rates0
          ? { "phases[1][items][1][tax_rates][0]": phases1Items1Tax_rates0 }
          : {}),
        ...(phases1Items1Tax_rates1
          ? { "phases[1][items][1][tax_rates][1]": phases1Items1Tax_rates1 }
          : {}),
        ...(phases1Add_invoice_items0Price
          ? { "phases[1][add_invoice_items][0][price]": phases1Add_invoice_items0Price }
          : {}),
        ...(phases1Add_invoice_items0Price_dataCurrency
          ? {
              "phases[1][add_invoice_items][0][price_data][currency]":
                phases1Add_invoice_items0Price_dataCurrency,
            }
          : {}),
        ...(phases1Add_invoice_items0Price_dataProduct
          ? {
              "phases[1][add_invoice_items][0][price_data][product]":
                phases1Add_invoice_items0Price_dataProduct,
            }
          : {}),
        ...(phases1Add_invoice_items0Price_dataTax_behavior
          ? {
              "phases[1][add_invoice_items][0][price_data][tax_behavior]":
                phases1Add_invoice_items0Price_dataTax_behavior,
            }
          : {}),
        ...(phases1Add_invoice_items0Price_dataUnit_amount
          ? {
              "phases[1][add_invoice_items][0][price_data][unit_amount]":
                phases1Add_invoice_items0Price_dataUnit_amount,
            }
          : {}),
        ...(phases1Add_invoice_items0Price_dataUnit_amount_decimal
          ? {
              "phases[1][add_invoice_items][0][price_data][unit_amount_decimal]":
                phases1Add_invoice_items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases1Add_invoice_items0Quantity
          ? { "phases[1][add_invoice_items][0][quantity]": phases1Add_invoice_items0Quantity }
          : {}),
        ...(phases1Add_invoice_items0Tax_rates0
          ? { "phases[1][add_invoice_items][0][tax_rates][0]": phases1Add_invoice_items0Tax_rates0 }
          : {}),
        ...(phases1Add_invoice_items0Tax_rates1
          ? { "phases[1][add_invoice_items][0][tax_rates][1]": phases1Add_invoice_items0Tax_rates1 }
          : {}),
        ...(phases1Add_invoice_items1Price
          ? { "phases[1][add_invoice_items][1][price]": phases1Add_invoice_items1Price }
          : {}),
        ...(phases1Add_invoice_items1Price_dataCurrency
          ? {
              "phases[1][add_invoice_items][1][price_data][currency]":
                phases1Add_invoice_items1Price_dataCurrency,
            }
          : {}),
        ...(phases1Add_invoice_items1Price_dataProduct
          ? {
              "phases[1][add_invoice_items][1][price_data][product]":
                phases1Add_invoice_items1Price_dataProduct,
            }
          : {}),
        ...(phases1Add_invoice_items1Price_dataTax_behavior
          ? {
              "phases[1][add_invoice_items][1][price_data][tax_behavior]":
                phases1Add_invoice_items1Price_dataTax_behavior,
            }
          : {}),
        ...(phases1Add_invoice_items1Price_dataUnit_amount
          ? {
              "phases[1][add_invoice_items][1][price_data][unit_amount]":
                phases1Add_invoice_items1Price_dataUnit_amount,
            }
          : {}),
        ...(phases1Add_invoice_items1Price_dataUnit_amount_decimal
          ? {
              "phases[1][add_invoice_items][1][price_data][unit_amount_decimal]":
                phases1Add_invoice_items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(phases1Add_invoice_items1Quantity
          ? { "phases[1][add_invoice_items][1][quantity]": phases1Add_invoice_items1Quantity }
          : {}),
        ...(phases1Add_invoice_items1Tax_rates0
          ? { "phases[1][add_invoice_items][1][tax_rates][0]": phases1Add_invoice_items1Tax_rates0 }
          : {}),
        ...(phases1Add_invoice_items1Tax_rates1
          ? { "phases[1][add_invoice_items][1][tax_rates][1]": phases1Add_invoice_items1Tax_rates1 }
          : {}),
        ...(phases1Application_fee_percent
          ? { "phases[1][application_fee_percent]": phases1Application_fee_percent }
          : {}),
        ...(phases1Automatic_taxEnabled
          ? { "phases[1][automatic_tax][enabled]": phases1Automatic_taxEnabled }
          : {}),
        ...(phases1Billing_cycle_anchor
          ? { "phases[1][billing_cycle_anchor]": phases1Billing_cycle_anchor }
          : {}),
        ...(phases1Billing_thresholdsAmount_gte
          ? { "phases[1][billing_thresholds][amount_gte]": phases1Billing_thresholdsAmount_gte }
          : {}),
        ...(phases1Billing_thresholdsReset_billing_cycle_anchor
          ? {
              "phases[1][billing_thresholds][reset_billing_cycle_anchor]":
                phases1Billing_thresholdsReset_billing_cycle_anchor,
            }
          : {}),
        ...(phases1Collection_method
          ? { "phases[1][collection_method]": phases1Collection_method }
          : {}),
        ...(phases1Coupon ? { "phases[1][coupon]": phases1Coupon } : {}),
        ...(phases1Currency ? { "phases[1][currency]": phases1Currency } : {}),
        ...(phases1Default_payment_method
          ? { "phases[1][default_payment_method]": phases1Default_payment_method }
          : {}),
        ...(phases1Default_tax_rates0
          ? { "phases[1][default_tax_rates][0]": phases1Default_tax_rates0 }
          : {}),
        ...(phases1Default_tax_rates1
          ? { "phases[1][default_tax_rates][1]": phases1Default_tax_rates1 }
          : {}),
        ...(phases1End_date ? { "phases[1][end_date]": phases1End_date } : {}),
        ...(phases1Invoice_settingsDays_until_due
          ? { "phases[1][invoice_settings][days_until_due]": phases1Invoice_settingsDays_until_due }
          : {}),
        ...(phases1Iterations ? { "phases[1][iterations]": phases1Iterations } : {}),
        ...(phases1Metadata ? { "phases[1][metadata]": phases1Metadata } : {}),
        ...(phases1Proration_behavior
          ? { "phases[1][proration_behavior]": phases1Proration_behavior }
          : {}),
        ...(phases1Start_date ? { "phases[1][start_date]": phases1Start_date } : {}),
        ...(phases1Transfer_dataDestination
          ? { "phases[1][transfer_data][destination]": phases1Transfer_dataDestination }
          : {}),
        ...(phases1Transfer_dataAmount_percent
          ? { "phases[1][transfer_data][amount_percent]": phases1Transfer_dataAmount_percent }
          : {}),
        ...(phases1Trial ? { "phases[1][trial]": phases1Trial } : {}),
        ...(phases1Trial_end ? { "phases[1][trial_end]": phases1Trial_end } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, schedule }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SCHEDULE: "A valid schedule field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof schedule !== "string") throw new Error(ERRORS.INVALID_SCHEDULE);
};
