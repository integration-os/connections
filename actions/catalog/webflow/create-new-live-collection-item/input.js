const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_WEBFLOW_BEARER_TOKEN: $env.BUILDABLE_WEBFLOW_BEARER_TOKEN, // Required
    collection_id: "620d57f3178d6bd202953d97", // Required
    fields: {
      name: "Exciting blog post title live", // Required
      _archived: false, // Required
      _draft: false, // Required
      slug: "exciting-post-live",
      color: "#a98080",
      "post-summary": "Summary of exciting blog post",
      "main-image": "580e63fe8c9a982ac9b8b749",
    },
  };
};
