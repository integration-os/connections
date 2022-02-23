/**
 * ----------------------------------------------------------------------------------------------------
 * Cancel Order [Run]
 *
 * @description - Cancel an order using the Shopify API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://help.shopify.com/api/reference/order
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { Shopify, DataType } = require("@shopify/shopify-api");

const getClient = (storeUrl, accessToken) => new Shopify.Clients.Rest(storeUrl, accessToken);

const getPath = (orderId) => `orders/${orderId}/cancel`;

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { STORE_URL, ACCESS_TOKEN, orderId, ...params } = input;

  verifyInput(input);

  const client = getClient(STORE_URL, ACCESS_TOKEN);
  const path = getPath(orderId);

  try {
    const data = await client.post({
      path,
      data: { ...params },
      type: DataType.JSON,
    });

    return data?.body?.order;
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

/*
 * Verifies the input parameters
 */
const verifyInput = ({ ACCESS_TOKEN, STORE_URL }) => {
  const ERRORS = {
    NO_ACCESS_TOKEN: `A valid ACCESS_TOKEN is required. 
                  You can add one to your environment variables at 
                  https://app.buildable.dev/settings/environment-variables.`,
    NO_STORE_URL: `A valid STORE_URL is required. 
                  You can add one to your environment variables at 
                  https://app.buildable.dev/settings/environment-variables.`,
  };

  if (typeof ACCESS_TOKEN === "undefined") throw new Error(ERRORS.NO_ACCESS_TOKEN);
  if (typeof STORE_URL === "undefined") throw new Error(ERRORS.NO_STORE_URL);
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
