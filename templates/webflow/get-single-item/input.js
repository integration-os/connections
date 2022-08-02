const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_WEBFLOW_BEARER_TOKEN: $env.BUILDABLE_WEBFLOW_BEARER_TOKEN, // Required
    collection_id: "620d57f3178d6bd202953d97", // Required
    item_id: "6215324ed03f1a3669a8fcd3", // Required
  };
};
