const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    quote,
    application_fee_amount,
    application_fee_percent,
    automatic_tax,
    collection_method,
    customer,
    default_tax_rates,
    description,
    discounts,
    expand,
    expires_at,
    footer,
    header,
    invoice_settings,
    line_items,
    metadata,
    on_behalf_of,
    subscription_data,
    transfer_data,
    automatic_taxEnabled,
    default_tax_rates0,
    default_tax_rates1,
    discounts0Coupon,
    discounts0Discount,
    discounts1Coupon,
    discounts1Discount,
    expand0,
    expand1,
    invoice_settingsDays_until_due,
    line_items0Id,
    line_items0Price,
    line_items0Price_dataCurrency,
    line_items0Price_dataProduct,
    line_items0Price_dataRecurringInterval,
    line_items0Price_dataRecurringInterval_count,
    line_items0Price_dataTax_behavior,
    line_items0Price_dataUnit_amount,
    line_items0Price_dataUnit_amount_decimal,
    line_items0Quantity,
    line_items0Tax_rates0,
    line_items0Tax_rates1,
    line_items1Id,
    line_items1Price,
    line_items1Price_dataCurrency,
    line_items1Price_dataProduct,
    line_items1Price_dataRecurringInterval,
    line_items1Price_dataRecurringInterval_count,
    line_items1Price_dataTax_behavior,
    line_items1Price_dataUnit_amount,
    line_items1Price_dataUnit_amount_decimal,
    line_items1Quantity,
    line_items1Tax_rates0,
    line_items1Tax_rates1,
    subscription_dataEffective_date,
    subscription_dataTrial_period_days,
    transfer_dataDestination,
    transfer_dataAmount,
    transfer_dataAmount_percent,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/quotes/${quote}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(application_fee_amount ? { application_fee_amount } : {}),
        ...(application_fee_percent ? { application_fee_percent } : {}),
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(collection_method ? { collection_method } : {}),
        ...(customer ? { customer } : {}),
        ...(default_tax_rates ? { default_tax_rates } : {}),
        ...(description ? { description } : {}),
        ...(discounts ? { discounts } : {}),
        ...(expand ? { expand } : {}),
        ...(expires_at ? { expires_at } : {}),
        ...(footer ? { footer } : {}),
        ...(header ? { header } : {}),
        ...(invoice_settings ? { invoice_settings } : {}),
        ...(line_items ? { line_items } : {}),
        ...(metadata ? { metadata } : {}),
        ...(on_behalf_of ? { on_behalf_of } : {}),
        ...(subscription_data ? { subscription_data } : {}),
        ...(transfer_data ? { transfer_data } : {}),
        ...(automatic_taxEnabled ? { "automatic_tax[enabled]": automatic_taxEnabled } : {}),
        ...(default_tax_rates0 ? { "default_tax_rates[0]": default_tax_rates0 } : {}),
        ...(default_tax_rates1 ? { "default_tax_rates[1]": default_tax_rates1 } : {}),
        ...(discounts0Coupon ? { "discounts[0][coupon]": discounts0Coupon } : {}),
        ...(discounts0Discount ? { "discounts[0][discount]": discounts0Discount } : {}),
        ...(discounts1Coupon ? { "discounts[1][coupon]": discounts1Coupon } : {}),
        ...(discounts1Discount ? { "discounts[1][discount]": discounts1Discount } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(invoice_settingsDays_until_due
          ? { "invoice_settings[days_until_due]": invoice_settingsDays_until_due }
          : {}),
        ...(line_items0Id ? { "line_items[0][id]": line_items0Id } : {}),
        ...(line_items0Price ? { "line_items[0][price]": line_items0Price } : {}),
        ...(line_items0Price_dataCurrency
          ? { "line_items[0][price_data][currency]": line_items0Price_dataCurrency }
          : {}),
        ...(line_items0Price_dataProduct
          ? { "line_items[0][price_data][product]": line_items0Price_dataProduct }
          : {}),
        ...(line_items0Price_dataRecurringInterval
          ? {
              "line_items[0][price_data][recurring][interval]":
                line_items0Price_dataRecurringInterval,
            }
          : {}),
        ...(line_items0Price_dataRecurringInterval_count
          ? {
              "line_items[0][price_data][recurring][interval_count]":
                line_items0Price_dataRecurringInterval_count,
            }
          : {}),
        ...(line_items0Price_dataTax_behavior
          ? { "line_items[0][price_data][tax_behavior]": line_items0Price_dataTax_behavior }
          : {}),
        ...(line_items0Price_dataUnit_amount
          ? { "line_items[0][price_data][unit_amount]": line_items0Price_dataUnit_amount }
          : {}),
        ...(line_items0Price_dataUnit_amount_decimal
          ? {
              "line_items[0][price_data][unit_amount_decimal]":
                line_items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(line_items0Quantity ? { "line_items[0][quantity]": line_items0Quantity } : {}),
        ...(line_items0Tax_rates0 ? { "line_items[0][tax_rates][0]": line_items0Tax_rates0 } : {}),
        ...(line_items0Tax_rates1 ? { "line_items[0][tax_rates][1]": line_items0Tax_rates1 } : {}),
        ...(line_items1Id ? { "line_items[1][id]": line_items1Id } : {}),
        ...(line_items1Price ? { "line_items[1][price]": line_items1Price } : {}),
        ...(line_items1Price_dataCurrency
          ? { "line_items[1][price_data][currency]": line_items1Price_dataCurrency }
          : {}),
        ...(line_items1Price_dataProduct
          ? { "line_items[1][price_data][product]": line_items1Price_dataProduct }
          : {}),
        ...(line_items1Price_dataRecurringInterval
          ? {
              "line_items[1][price_data][recurring][interval]":
                line_items1Price_dataRecurringInterval,
            }
          : {}),
        ...(line_items1Price_dataRecurringInterval_count
          ? {
              "line_items[1][price_data][recurring][interval_count]":
                line_items1Price_dataRecurringInterval_count,
            }
          : {}),
        ...(line_items1Price_dataTax_behavior
          ? { "line_items[1][price_data][tax_behavior]": line_items1Price_dataTax_behavior }
          : {}),
        ...(line_items1Price_dataUnit_amount
          ? { "line_items[1][price_data][unit_amount]": line_items1Price_dataUnit_amount }
          : {}),
        ...(line_items1Price_dataUnit_amount_decimal
          ? {
              "line_items[1][price_data][unit_amount_decimal]":
                line_items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(line_items1Quantity ? { "line_items[1][quantity]": line_items1Quantity } : {}),
        ...(line_items1Tax_rates0 ? { "line_items[1][tax_rates][0]": line_items1Tax_rates0 } : {}),
        ...(line_items1Tax_rates1 ? { "line_items[1][tax_rates][1]": line_items1Tax_rates1 } : {}),
        ...(subscription_dataEffective_date
          ? { "subscription_data[effective_date]": subscription_dataEffective_date }
          : {}),
        ...(subscription_dataTrial_period_days
          ? { "subscription_data[trial_period_days]": subscription_dataTrial_period_days }
          : {}),
        ...(transfer_dataDestination
          ? { "transfer_data[destination]": transfer_dataDestination }
          : {}),
        ...(transfer_dataAmount ? { "transfer_data[amount]": transfer_dataAmount } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, quote }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_QUOTE: "A valid quote field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof quote !== "string") throw new Error(ERRORS.INVALID_QUOTE);
};
