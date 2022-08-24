const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    currency,
    inventory,
    price,
    product,
    active,
    attributes,
    expand,
    id,
    image,
    metadata,
    package_dimensions,
    inventoryType,
    inventoryQuantity,
    inventoryValue,
    expand0,
    expand1,
    package_dimensionsHeight,
    package_dimensionsLength,
    package_dimensionsWeight,
    package_dimensionsWidth,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/skus",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        currency,
        inventory,
        price,
        product,
        ...(active ? { active } : {}),
        ...(attributes ? { attributes } : {}),
        ...(expand ? { expand } : {}),
        ...(id ? { id } : {}),
        ...(image ? { image } : {}),
        ...(metadata ? { metadata } : {}),
        ...(package_dimensions ? { package_dimensions } : {}),
        ...(inventoryType ? { "inventory[type]": inventoryType } : {}),
        ...(inventoryQuantity ? { "inventory[quantity]": inventoryQuantity } : {}),
        ...(inventoryValue ? { "inventory[value]": inventoryValue } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, currency, inventory, price, product }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
    INVALID_INVENTORY: "A valid inventory field (object) was not provided in the input.",
    INVALID_PRICE: "A valid price field (string) was not provided in the input.",
    INVALID_PRODUCT: "A valid product field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof inventory !== "object") throw new Error(ERRORS.INVALID_INVENTORY);
  if (typeof price !== "string") throw new Error(ERRORS.INVALID_PRICE);
  if (typeof product !== "string") throw new Error(ERRORS.INVALID_PRODUCT);
};
