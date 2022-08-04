const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_WEBFLOW_BEARER_TOKEN: $env.BUILDABLE_WEBFLOW_BEARER_TOKEN, // Required
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
