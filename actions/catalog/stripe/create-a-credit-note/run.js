const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    invoice,
    amount,
    credit_amount,
    expand,
    lines,
    memo,
    metadata,
    out_of_band_amount,
    reason,
    refund,
    refund_amount,
    expand0,
    expand1,
    lines0Type,
    lines0Amount,
    lines0Description,
    lines0Invoice_line_item,
    lines0Quantity,
    lines0Tax_rates0,
    lines0Tax_rates1,
    lines0Unit_amount,
    lines0Unit_amount_decimal,
    lines1Type,
    lines1Amount,
    lines1Description,
    lines1Invoice_line_item,
    lines1Quantity,
    lines1Tax_rates0,
    lines1Tax_rates1,
    lines1Unit_amount,
    lines1Unit_amount_decimal,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/credit_notes",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        invoice,
        ...(amount ? { amount } : {}),
        ...(credit_amount ? { credit_amount } : {}),
        ...(expand ? { expand } : {}),
        ...(lines ? { lines } : {}),
        ...(memo ? { memo } : {}),
        ...(metadata ? { metadata } : {}),
        ...(out_of_band_amount ? { out_of_band_amount } : {}),
        ...(reason ? { reason } : {}),
        ...(refund ? { refund } : {}),
        ...(refund_amount ? { refund_amount } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(lines0Type ? { "lines[0][type]": lines0Type } : {}),
        ...(lines0Amount ? { "lines[0][amount]": lines0Amount } : {}),
        ...(lines0Description ? { "lines[0][description]": lines0Description } : {}),
        ...(lines0Invoice_line_item
          ? { "lines[0][invoice_line_item]": lines0Invoice_line_item }
          : {}),
        ...(lines0Quantity ? { "lines[0][quantity]": lines0Quantity } : {}),
        ...(lines0Tax_rates0 ? { "lines[0][tax_rates][0]": lines0Tax_rates0 } : {}),
        ...(lines0Tax_rates1 ? { "lines[0][tax_rates][1]": lines0Tax_rates1 } : {}),
        ...(lines0Unit_amount ? { "lines[0][unit_amount]": lines0Unit_amount } : {}),
        ...(lines0Unit_amount_decimal
          ? { "lines[0][unit_amount_decimal]": lines0Unit_amount_decimal }
          : {}),
        ...(lines1Type ? { "lines[1][type]": lines1Type } : {}),
        ...(lines1Amount ? { "lines[1][amount]": lines1Amount } : {}),
        ...(lines1Description ? { "lines[1][description]": lines1Description } : {}),
        ...(lines1Invoice_line_item
          ? { "lines[1][invoice_line_item]": lines1Invoice_line_item }
          : {}),
        ...(lines1Quantity ? { "lines[1][quantity]": lines1Quantity } : {}),
        ...(lines1Tax_rates0 ? { "lines[1][tax_rates][0]": lines1Tax_rates0 } : {}),
        ...(lines1Tax_rates1 ? { "lines[1][tax_rates][1]": lines1Tax_rates1 } : {}),
        ...(lines1Unit_amount ? { "lines[1][unit_amount]": lines1Unit_amount } : {}),
        ...(lines1Unit_amount_decimal
          ? { "lines[1][unit_amount_decimal]": lines1Unit_amount_decimal }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, invoice }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_INVOICE: "A valid invoice field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof invoice !== "string") throw new Error(ERRORS.INVALID_INVOICE);
};
