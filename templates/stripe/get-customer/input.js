/**
 * ----------------------------------------------------------------------------------------------------
 * Get Customer [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/customers/retrieve
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
    customerId: "cus_Kxi96Sd0npmWIU", // Required
  };
};
