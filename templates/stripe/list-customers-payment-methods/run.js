/**
 * ----------------------------------------------------------------------------------------------------
 * List a Customer's Payment Methods [Run]
 *
 * @description - List Payment Methods for a given Customer using the Stripe API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/customer_list
 *
 * ----------------------------------------------------------------------------------------------------
 */

const Stripe = require("stripe");

const getStripe = (key) =>
  new Stripe(key, {
    // apiVersion: null,
    // maxNetworkRetries: 0,
    // timeout: 80000,
    // host: "api.stripe.com",
    // protocol: "https",
    // port: 443,
    // telemetry: true,
  });

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { STRIPE_SECRET_KEY, type, customer, ...params } = input;

  verifyInput(input);

  try {
    const stripe = getStripe(STRIPE_SECRET_KEY);

    const paymentMethods = await stripe.customers.listPaymentMethods(customer, {
      type,
      ...params,
    });

    return paymentMethods;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: {
        statusCode: error?.statusCode,
        type: error?.type,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ STRIPE_SECRET_KEY, type, customer }) => {
  const ERRORS = {
    NO_STRIPE_SECRET_KEY: `A valid STRIPE_SECRET_KEY is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
    NO_TYPE: "A valid type is required.",
    NO_CUSTOMER: "A valid customer is required.",
  };

  if (typeof STRIPE_SECRET_KEY === "undefined") throw new Error(ERRORS.NO_STRIPE_SECRET_KEY);
  if (typeof type === "undefined") throw new Error(ERRORS.NO_TYPE);
  if (typeof customer === "undefined") throw new Error(ERRORS.NO_CUSTOMER);
};
