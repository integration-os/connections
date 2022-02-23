/**
 * ----------------------------------------------------------------------------------------------------
 * List Customers [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/customers/list
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

    // email: """,
    // created: {
    //     gt: 1489794300, // Timestamp
    //     gte: 1469784300, // Timestamp
    //     lt: 1420794300, // Timestamp
    //     lte: 1699794300 // Timestamp
    // },
    // ending_before: "cus_Kxi96Sd0npmWIU",
    // limit: 10,
    // starting_after: "cus_Kxi9vnWcJ7DhP5"
  };
};
