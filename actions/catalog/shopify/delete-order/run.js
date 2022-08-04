const { Shopify } = require("@shopify/shopify-api");

const getClient = (storeUrl, accessToken) => new Shopify.Clients.Rest(storeUrl, accessToken);

const getPath = (orderId) => `orders/${orderId}`;

const run = async (input) => {
  const { BUILDABLE_SHOPIFY_ACCESS_TOKEN, orderId, BUILDABLE_SHOPIFY_STORE_URL } = input;

  verifyInput(input);

  const client = getClient(BUILDABLE_SHOPIFY_STORE_URL, BUILDABLE_SHOPIFY_ACCESS_TOKEN);
  const path = getPath(orderId);

  try {
    await client.delete({
      path,
    });

    return {
      deleted: true,
    };
  } catch (error) {
    const message = getErrorMessageFromStatusCode(error?.code);
    return {
      failed: true,
      message,
      data: {
        statusCode: error?.code,
        ...error,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_SHOPIFY_ACCESS_TOKEN, BUILDABLE_SHOPIFY_STORE_URL }) => {
  const ERRORS = {
    NO_BUILDABLE_SHOPIFY_ACCESS_TOKEN:
      "A valid BUILDABLE_SHOPIFY_ACCESS_TOKEN is required. Create your appropriate Connection to automatically add it.",
    NO_BUILDABLE_SHOPIFY_STORE_URL:
      "A valid BUILDABLE_SHOPIFY_STORE_URL is required. Create your appropriate Connection to automatically add it.",
  };

  if (typeof BUILDABLE_SHOPIFY_ACCESS_TOKEN === "undefined")
    throw new Error(ERRORS.NO_BUILDABLE_SHOPIFY_ACCESS_TOKEN);
  if (typeof BUILDABLE_SHOPIFY_STORE_URL === "undefined")
    throw new Error(ERRORS.NO_BUILDABLE_SHOPIFY_STORE_URL);
};

const getErrorMessageFromStatusCode = (statusCode) => {
  let message =
    "An internal error occurred in Shopify. Check out the Shopify status page for more information.";

  const errorMessages = {
    401: "The client doesn’t have correct authentication credentials.",
    402: "The shop is frozen. The shop owner will need to pay the outstanding balance to unfreeze the shop.",
    403: "The server is refusing to respond. This is typically caused by incorrect access scopes.",
    404: "The requested resource was not found but could be available again in the future.",
    422: "The request body contains semantic errors. This is typically caused by incorrect formatting, omitting required fields, or logical errors such as initiating a checkout for an out-of-stock product.",
    429: "The client has exceeded the rate limit.",
  };

  if (errorMessages[statusCode]) {
    message = errorMessages[statusCode];
  }

  return message;
};
