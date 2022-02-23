/**
 * ----------------------------------------------------------------------------------------------------
 * Attach Payment Method [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/attach
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
    paymentMethodId: "pm_1KIzhFSGVSOWoR3QcZaXt3Tn", // Required
    customerId: "cus_Kywq0LD855HPNr", // Required
  };
};
