const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_WEBFLOW_BEARER_TOKEN: $env.BUILDABLE_WEBFLOW_BEARER_TOKEN, // Required
    collection_id: "620d57f3178d6bd202953d97", // Required
    item_id: "621532357912fe85ddbc60bd", // Required
  };
};
