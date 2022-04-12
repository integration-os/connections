/**
 * ----------------------------------------------------------------------------------------------------
 * Remove Document [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.firestore.com/manual/reference/method/db.collection.remove/
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
    FIRESTORE_CONNECTION_KEY: $trigger.env.FIRESTORE_CONNECTION_KEY, // Required
    collection: "cities", // Required
    id: "DC", // Required
  };
};
