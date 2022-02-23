/**
 * ----------------------------------------------------------------------------------------------------
 * Increment Field [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/operator/update/inc/
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
    collection: "collection-1", // Required
    id: "61d62cf94bed0700133c866a", // Required
    field: "totalCalls", // Required
    inc: 1, // Required

    // convertToObjectId: true,
  };
};
