const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    orderId: "4457399156886", // Required

    // fields: "id,line_items,name,total_price"
  };
};
