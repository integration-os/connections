const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    subscription,
    billing_thresholds,
    expand,
    metadata,
    payment_behavior,
    price,
    price_data,
    proration_behavior,
    proration_date,
    quantity,
    tax_rates,
    billing_thresholdsUsage_gte,
    expand0,
    expand1,
    price_dataCurrency,
    price_dataProduct,
    price_dataRecurringInterval,
    price_dataRecurringInterval_count,
    price_dataTax_behavior,
    price_dataUnit_amount,
    price_dataUnit_amount_decimal,
    tax_rates0,
    tax_rates1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/subscription_items",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        subscription,
        ...(billing_thresholds ? { billing_thresholds } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(payment_behavior ? { payment_behavior } : {}),
        ...(price ? { price } : {}),
        ...(price_data ? { price_data } : {}),
        ...(proration_behavior ? { proration_behavior } : {}),
        ...(proration_date ? { proration_date } : {}),
        ...(quantity ? { quantity } : {}),
        ...(tax_rates ? { tax_rates } : {}),
        ...(billing_thresholdsUsage_gte
          ? { "billing_thresholds[usage_gte]": billing_thresholdsUsage_gte }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(price_dataCurrency ? { "price_data[currency]": price_dataCurrency } : {}),
        ...(price_dataProduct ? { "price_data[product]": price_dataProduct } : {}),
        ...(price_dataRecurringInterval
          ? { "price_data[recurring][interval]": price_dataRecurringInterval }
          : {}),
        ...(price_dataRecurringInterval_count
          ? { "price_data[recurring][interval_count]": price_dataRecurringInterval_count }
          : {}),
        ...(price_dataTax_behavior ? { "price_data[tax_behavior]": price_dataTax_behavior } : {}),
        ...(price_dataUnit_amount ? { "price_data[unit_amount]": price_dataUnit_amount } : {}),
        ...(price_dataUnit_amount_decimal
          ? { "price_data[unit_amount_decimal]": price_dataUnit_amount_decimal }
          : {}),
        ...(tax_rates0 ? { "tax_rates[0]": tax_rates0 } : {}),
        ...(tax_rates1 ? { "tax_rates[1]": tax_rates1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, subscription }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SUBSCRIPTION: "A valid subscription field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof subscription !== "string") throw new Error(ERRORS.INVALID_SUBSCRIPTION);
};
