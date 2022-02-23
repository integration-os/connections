/**
 * ----------------------------------------------------------------------------------------------------
 * CRUD API [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method
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
    MONGODB_CONNECTION_KEY: $trigger.env.MONGODB_CONNECTION_KEY, // Required
    collection: $trigger.params.p0, // Required [Note: p0 is the first parameter]
    action: $trigger.params.p1, // Required [Note: p1 is the second parameter]
    method: $trigger.method, // Required [Note: $trigger.method is the HTTP method]
    id: $trigger.params.p2, // Optional [Note: p2 is the third parameter]

    ...$trigger.body,
  };
};
