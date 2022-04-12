/**
 * ----------------------------------------------------------------------------------------------------
 * List Data [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
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

    // query: [["state", "==", "CA"], ["name", "==", "Los Angeles"]],
    // fields: ['id', 'name', 'country'],
    // pageSize: 10,
    // startAt: "Japan",
    // startAtField: "country",
    // sort: { country: -1 },
  };
};
