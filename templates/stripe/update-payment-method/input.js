/**
 * ----------------------------------------------------------------------------------------------------
 * Update Payment Method [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/update
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    STRIPE_SECRET_KEY: $trigger.env.STRIPE_SECRET_KEY, // Required
    paymentMethodId: "pm_1KHqDKSGVSOWoR3QATVbjkbj", // Required

    // billing_details: {
    //   address: {
    //     city: "San Francisco",
    //     country: "US",
    //     line1: "510 Townsend St",
    //     line2: "",
    //     postal_code: "98140",
    //     state: "CA",
    //   },
    //   email: "johndoe@email.com",
    //   name: "John Doe",
    //   phone: "",
    // },
    // metadata: {
    //   order_id: "6735",
    // },
    // card: {
    //   exp_month: 04,
    //   exp_year: 2023,
    // },
  };
};
