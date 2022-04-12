/**
 * ----------------------------------------------------------------------------------------------------
 * Update Document [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
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
    collection: "users", // Required
    id: "alovelace", // Required

    key: "updated1",
    // otherKeys: 10051164
  };
};
