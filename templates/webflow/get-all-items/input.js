/**
 * ----------------------------------------------------------------------------------------------------
 * Get All Items For a Collection [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.webflow.com/#get-all-items-for-a-collection
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
    WEBFLOW_BEARER_TOKEN: $trigger.env.WEBFLOW_BEARER_TOKEN, // Required
    collection_id: "620d57f3178d6bd202953d97", // Required,

    limit: 10,
    offset: 0,
  };
};
