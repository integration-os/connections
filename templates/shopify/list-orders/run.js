/**
 * ----------------------------------------------------------------------------------------------------
 * List Orders [Run]
 *
 * @description - Retrieve a list of orders with pagination using the Shopify API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://help.shopify.com/api/reference/order
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { Shopify } = require("@shopify/shopify-api");

const getClient = (storeUrl, accessToken) => new Shopify.Clients.Rest(storeUrl, accessToken);

const LIST_PATH = "orders";

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { ACCESS_TOKEN, STORE_URL, page = 1, limit = 10, since_id = undefined, ...params } = input;

  verifyInput(input);

  const client = getClient(STORE_URL, ACCESS_TOKEN);

  try {
    const orders = await getOrders(client, params, since_id);

    return {
      ...paginate(orders, page, limit),
    };
  } catch (error) {
    const message = getErrorMessageFromStatusCode(error?.code) || error?.message;
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

const getOrders = async (client, params, since_id) => {
  const data = await client.get({
    path: LIST_PATH,
    query: { ...params, since_id },
  });

  return data?.body?.orders;
};

const paginate = (data, page, pageSize) => {
  const totalPages = Math.ceil(data.length / pageSize);

  if (page > totalPages)
    throw new Error(`Requested page is out of scope. Last page number is ${totalPages}.`);

  return {
    rows: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
    totalPages,
  };
};

const getErrorMessageFromStatusCode = (statusCode) => {
  const errorMessages = {
    401: "The client doesn’t have correct authentication credentials.",
    402: "The shop is frozen. The shop owner will need to pay the outstanding balance to unfreeze the shop.",
    403: "The server is refusing to respond. This is typically caused by incorrect access scopes.",
    404: "The requested resource was not found but could be available again in the future.",
    422: "The request body contains semantic errors. This is typically caused by incorrect formatting, omitting required fields, or logical errors such as initiating a checkout for an out-of-stock product.",
    429: "The client has exceeded the rate limit.",
  };

  if (errorMessages[statusCode]) {
    return errorMessages[statusCode];
  }

  if (statusCode) {
    return "An internal error occurred in Shopify. Check out the Shopify status page for more information.";
  }
};
