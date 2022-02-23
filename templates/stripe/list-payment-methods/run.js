/**
 * ----------------------------------------------------------------------------------------------------
 * List Payment Methods [Run]
 *
 * @description - List all Payment Intents using the Stripe API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/list
 *
 * ----------------------------------------------------------------------------------------------------
 */

const Stripe = require("stripe");

const getStripe = (key) => new Stripe(key, {
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
  const { STRIPE_SECRET_KEY, ...params } = input;

  verifyInput(input);

  try {
    const stripe = getStripe(STRIPE_SECRET_KEY);

    const paymentMethods = await stripe.paymentMethods.list(params);

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
const verifyInput = ({ STRIPE_SECRET_KEY }) => {
  const ERRORS = {
    NO_STRIPE_SECRET_KEY: `A valid STRIPE_SECRET_KEY is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
  };

  if (typeof STRIPE_SECRET_KEY === "undefined") throw new Error(ERRORS.NO_STRIPE_SECRET_KEY);
};
