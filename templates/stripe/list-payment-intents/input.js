/**
 * ----------------------------------------------------------------------------------------------------
 * List Payment Intents [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_intents/list
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

    // customer: "",
    // created: {
    //     gt: 1642499966,
    //     gte: 1642499966,
    //     lt: 1641899935,
    //     lte: 1641899935
    // },
    // ending_before: "",
    // starting_after: "",
    // limit: 10,
  };
};
