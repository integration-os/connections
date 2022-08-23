const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    invoiceitem,
    amount,
    description,
    discountable,
    discounts,
    expand,
    metadata,
    period,
    price,
    price_data,
    quantity,
    tax_rates,
    unit_amount,
    unit_amount_decimal,
    discounts0Coupon,
    discounts0Discount,
    discounts1Coupon,
    discounts1Discount,
    expand0,
    expand1,
    periodEnd,
    periodStart,
    price_dataCurrency,
    price_dataProduct,
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
      url: `https://api.stripe.com/v1/invoiceitems/${invoiceitem}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(amount ? { amount } : {}),
        ...(description ? { description } : {}),
        ...(discountable ? { discountable } : {}),
        ...(discounts ? { discounts } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(period ? { period } : {}),
        ...(price ? { price } : {}),
        ...(price_data ? { price_data } : {}),
        ...(quantity ? { quantity } : {}),
        ...(tax_rates ? { tax_rates } : {}),
        ...(unit_amount ? { unit_amount } : {}),
        ...(unit_amount_decimal ? { unit_amount_decimal } : {}),
        ...(discounts0Coupon ? { "discounts[0][coupon]": discounts0Coupon } : {}),
        ...(discounts0Discount ? { "discounts[0][discount]": discounts0Discount } : {}),
        ...(discounts1Coupon ? { "discounts[1][coupon]": discounts1Coupon } : {}),
        ...(discounts1Discount ? { "discounts[1][discount]": discounts1Discount } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(periodEnd ? { "period[end]": periodEnd } : {}),
        ...(periodStart ? { "period[start]": periodStart } : {}),
        ...(price_dataCurrency ? { "price_data[currency]": price_dataCurrency } : {}),
        ...(price_dataProduct ? { "price_data[product]": price_dataProduct } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, invoiceitem }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_INVOICEITEM: "A valid invoiceitem field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof invoiceitem !== "string") throw new Error(ERRORS.INVALID_INVOICEITEM);
};
