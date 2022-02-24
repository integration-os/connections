/**
 * ----------------------------------------------------------------------------------------------------
 * Create New Collection Item [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.webflow.com/#create-new-collection-item
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
    collection_id: "620d57f3178d6bd202953d97", // Required
    fields: {
      name: "Exciting blog post title", //Required,
      _archived: false, //Required,
      _draft: false, //Required,
      slug: "exciting-post",
      color: "#a98080",
      "post-summary": "Summary of exciting blog post",
      "main-image": "580e63fe8c9a982ac9b8b749",
    }
  };
};
