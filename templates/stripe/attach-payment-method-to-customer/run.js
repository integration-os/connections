/**
 * ----------------------------------------------------------------------------------------------------
 * Attach Payment Method [Run]
 *
 * @description - Attach a Payment Method to a Customer using the Stripe API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/attach
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
  const { STRIPE_SECRET_KEY, paymentMethodId, customerId } = input;

  verifyInput(input);

  try {
    const stripe = getStripe(STRIPE_SECRET_KEY);

    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    return paymentMethod;
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
const verifyInput = ({ STRIPE_SECRET_KEY, paymentMethodId, customerId }) => {
  const ERRORS = {
    NO_STRIPE_SECRET_KEY: `A valid STRIPE_SECRET_KEY is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
    NO_PAYMENT_METHOD_ID: "A valid paymentMethodId is required.",
    NO_CUSTOMER_ID: "A valid customerId is required.",
  };

  if (typeof STRIPE_SECRET_KEY === "undefined") throw new Error(ERRORS.NO_STRIPE_SECRET_KEY);
  if (typeof paymentMethodId === "undefined") throw new Error(ERRORS.NO_PAYMENT_METHOD_ID);
  if (typeof customerId === "undefined") throw new Error(ERRORS.NO_CUSTOMER_ID);
};
