/**
 * ----------------------------------------------------------------------------------------------------
 * Capture a Payment Intent [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_intents/capture
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
    paymentIntentId: "pi_3KJE0xSGVSOWoR3Q1ny7hT7Z", // Required

    // amount_to_capture: 10,
    // application_fee_amount: 2,
    // statement_descriptor: "",
    // statement_descriptor_suffix: "",
    // transfer_data: {
    //     amount: 1
    // }
  };
};
