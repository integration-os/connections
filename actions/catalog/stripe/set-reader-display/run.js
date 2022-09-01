const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    reader,
    type,
    cart,
    expand,
    cartCurrency,
    cartLine_items0Amount,
    cartLine_items0Description,
    cartLine_items0Quantity,
    cartLine_items1Amount,
    cartLine_items1Description,
    cartLine_items1Quantity,
    cartTotal,
    cartTax,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/terminal/readers/${reader}/set_reader_display`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        type,
        ...(cart ? { cart } : {}),
        ...(expand ? { expand } : {}),
        ...(cartCurrency ? { "cart[currency]": cartCurrency } : {}),
        ...(cartLine_items0Amount ? { "cart[line_items][0][amount]": cartLine_items0Amount } : {}),
        ...(cartLine_items0Description
          ? { "cart[line_items][0][description]": cartLine_items0Description }
          : {}),
        ...(cartLine_items0Quantity
          ? { "cart[line_items][0][quantity]": cartLine_items0Quantity }
          : {}),
        ...(cartLine_items1Amount ? { "cart[line_items][1][amount]": cartLine_items1Amount } : {}),
        ...(cartLine_items1Description
          ? { "cart[line_items][1][description]": cartLine_items1Description }
          : {}),
        ...(cartLine_items1Quantity
          ? { "cart[line_items][1][quantity]": cartLine_items1Quantity }
          : {}),
        ...(cartTotal ? { "cart[total]": cartTotal } : {}),
        ...(cartTax ? { "cart[tax]": cartTax } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, reader, type }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_READER: "A valid reader field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof reader !== "string") throw new Error(ERRORS.INVALID_READER);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
};
