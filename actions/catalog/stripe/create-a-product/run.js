const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    name,
    active,
    default_price_data,
    description,
    expand,
    id,
    images,
    metadata,
    package_dimensions,
    shippable,
    statement_descriptor,
    tax_code,
    unit_label,
    url,
    default_price_dataCurrency,
    default_price_dataCurrency_options,
    default_price_dataRecurringInterval,
    default_price_dataRecurringInterval_count,
    default_price_dataTax_behavior,
    default_price_dataUnit_amount,
    default_price_dataUnit_amount_decimal,
    expand0,
    expand1,
    images0,
    images1,
    package_dimensionsHeight,
    package_dimensionsLength,
    package_dimensionsWeight,
    package_dimensionsWidth,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/products",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        name,
        ...(active ? { active } : {}),
        ...(default_price_data ? { default_price_data } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(id ? { id } : {}),
        ...(images ? { images } : {}),
        ...(metadata ? { metadata } : {}),
        ...(package_dimensions ? { package_dimensions } : {}),
        ...(shippable ? { shippable } : {}),
        ...(statement_descriptor ? { statement_descriptor } : {}),
        ...(tax_code ? { tax_code } : {}),
        ...(unit_label ? { unit_label } : {}),
        ...(url ? { url } : {}),
        ...(default_price_dataCurrency
          ? { "default_price_data[currency]": default_price_dataCurrency }
          : {}),
        ...(default_price_dataCurrency_options
          ? { "default_price_data[currency_options]": default_price_dataCurrency_options }
          : {}),
        ...(default_price_dataRecurringInterval
          ? { "default_price_data[recurring][interval]": default_price_dataRecurringInterval }
          : {}),
        ...(default_price_dataRecurringInterval_count
          ? {
              "default_price_data[recurring][interval_count]":
                default_price_dataRecurringInterval_count,
            }
          : {}),
        ...(default_price_dataTax_behavior
          ? { "default_price_data[tax_behavior]": default_price_dataTax_behavior }
          : {}),
        ...(default_price_dataUnit_amount
          ? { "default_price_data[unit_amount]": default_price_dataUnit_amount }
          : {}),
        ...(default_price_dataUnit_amount_decimal
          ? { "default_price_data[unit_amount_decimal]": default_price_dataUnit_amount_decimal }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(images0 ? { "images[0]": images0 } : {}),
        ...(images1 ? { "images[1]": images1 } : {}),
        ...(package_dimensionsHeight
          ? { "package_dimensions[height]": package_dimensionsHeight }
          : {}),
        ...(package_dimensionsLength
          ? { "package_dimensions[length]": package_dimensionsLength }
          : {}),
        ...(package_dimensionsWeight
          ? { "package_dimensions[weight]": package_dimensionsWeight }
          : {}),
        ...(package_dimensionsWidth
          ? { "package_dimensions[width]": package_dimensionsWidth }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, name }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
