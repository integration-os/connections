/**
 * ----------------------------------------------------------------------------------------------------
 * Update Live Collection Item [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.webflow.com/#update-live-collection-item
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
    item_id: "6215324ed03f1a3669a8fcd3", // Required
    fields: {
      name: "Updated Exciting blog post title live", //Required
      _archived: false, //Required
      _draft: false, // Required
      slug: "exciting-post-updated", //Required
      // "color": "#a98080",
      // "post-summary": "Summary of exciting blog post",
      // "main-image": "580e63fe8c9a982ac9b8b749"
    },
  };
};
