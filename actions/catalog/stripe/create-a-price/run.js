const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    currency,
    active,
    billing_scheme,
    currency_options,
    custom_unit_amount,
    expand,
    lookup_key,
    metadata,
    nickname,
    product,
    product_data,
    recurring,
    tax_behavior,
    tiers,
    tiers_mode,
    transfer_lookup_key,
    transform_quantity,
    unit_amount,
    unit_amount_decimal,
    custom_unit_amountEnabled,
    custom_unit_amountMaximum,
    custom_unit_amountMinimum,
    custom_unit_amountPreset,
    expand0,
    expand1,
    product_dataName,
    product_dataActive,
    product_dataId,
    product_dataMetadata,
    product_dataStatement_descriptor,
    product_dataTax_code,
    product_dataUnit_label,
    recurringInterval,
    recurringAggregate_usage,
    recurringInterval_count,
    recurringUsage_type,
    tiers0Up_to,
    tiers0Flat_amount,
    tiers0Flat_amount_decimal,
    tiers0Unit_amount,
    tiers0Unit_amount_decimal,
    tiers1Up_to,
    tiers1Flat_amount,
    tiers1Flat_amount_decimal,
    tiers1Unit_amount,
    tiers1Unit_amount_decimal,
    transform_quantityDivide_by,
    transform_quantityRound,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/prices",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        currency,
        ...(active ? { active } : {}),
        ...(billing_scheme ? { billing_scheme } : {}),
        ...(currency_options ? { currency_options } : {}),
        ...(custom_unit_amount ? { custom_unit_amount } : {}),
        ...(expand ? { expand } : {}),
        ...(lookup_key ? { lookup_key } : {}),
        ...(metadata ? { metadata } : {}),
        ...(nickname ? { nickname } : {}),
        ...(product ? { product } : {}),
        ...(product_data ? { product_data } : {}),
        ...(recurring ? { recurring } : {}),
        ...(tax_behavior ? { tax_behavior } : {}),
        ...(tiers ? { tiers } : {}),
        ...(tiers_mode ? { tiers_mode } : {}),
        ...(transfer_lookup_key ? { transfer_lookup_key } : {}),
        ...(transform_quantity ? { transform_quantity } : {}),
        ...(unit_amount ? { unit_amount } : {}),
        ...(unit_amount_decimal ? { unit_amount_decimal } : {}),
        ...(custom_unit_amountEnabled
          ? { "custom_unit_amount[enabled]": custom_unit_amountEnabled }
          : {}),
        ...(custom_unit_amountMaximum
          ? { "custom_unit_amount[maximum]": custom_unit_amountMaximum }
          : {}),
        ...(custom_unit_amountMinimum
          ? { "custom_unit_amount[minimum]": custom_unit_amountMinimum }
          : {}),
        ...(custom_unit_amountPreset
          ? { "custom_unit_amount[preset]": custom_unit_amountPreset }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(product_dataName ? { "product_data[name]": product_dataName } : {}),
        ...(product_dataActive ? { "product_data[active]": product_dataActive } : {}),
        ...(product_dataId ? { "product_data[id]": product_dataId } : {}),
        ...(product_dataMetadata ? { "product_data[metadata]": product_dataMetadata } : {}),
        ...(product_dataStatement_descriptor
          ? { "product_data[statement_descriptor]": product_dataStatement_descriptor }
          : {}),
        ...(product_dataTax_code ? { "product_data[tax_code]": product_dataTax_code } : {}),
        ...(product_dataUnit_label ? { "product_data[unit_label]": product_dataUnit_label } : {}),
        ...(recurringInterval ? { "recurring[interval]": recurringInterval } : {}),
        ...(recurringAggregate_usage
          ? { "recurring[aggregate_usage]": recurringAggregate_usage }
          : {}),
        ...(recurringInterval_count
          ? { "recurring[interval_count]": recurringInterval_count }
          : {}),
        ...(recurringUsage_type ? { "recurring[usage_type]": recurringUsage_type } : {}),
        ...(tiers0Up_to ? { "tiers[0][up_to]": tiers0Up_to } : {}),
        ...(tiers0Flat_amount ? { "tiers[0][flat_amount]": tiers0Flat_amount } : {}),
        ...(tiers0Flat_amount_decimal
          ? { "tiers[0][flat_amount_decimal]": tiers0Flat_amount_decimal }
          : {}),
        ...(tiers0Unit_amount ? { "tiers[0][unit_amount]": tiers0Unit_amount } : {}),
        ...(tiers0Unit_amount_decimal
          ? { "tiers[0][unit_amount_decimal]": tiers0Unit_amount_decimal }
          : {}),
        ...(tiers1Up_to ? { "tiers[1][up_to]": tiers1Up_to } : {}),
        ...(tiers1Flat_amount ? { "tiers[1][flat_amount]": tiers1Flat_amount } : {}),
        ...(tiers1Flat_amount_decimal
          ? { "tiers[1][flat_amount_decimal]": tiers1Flat_amount_decimal }
          : {}),
        ...(tiers1Unit_amount ? { "tiers[1][unit_amount]": tiers1Unit_amount } : {}),
        ...(tiers1Unit_amount_decimal
          ? { "tiers[1][unit_amount_decimal]": tiers1Unit_amount_decimal }
          : {}),
        ...(transform_quantityDivide_by
          ? { "transform_quantity[divide_by]": transform_quantityDivide_by }
          : {}),
        ...(transform_quantityRound
          ? { "transform_quantity[round]": transform_quantityRound }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, currency }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
};
