/**
 * ----------------------------------------------------------------------------------------------------
 * Insert Document [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
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

    key: "new",
    // otherKeys: 10051164
  };
};
