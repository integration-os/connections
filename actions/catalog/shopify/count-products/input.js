const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required

    // collection_id: "",
    // created_at_max: "2024-04-25T16:15:47-04:00",
    // created_at_min: "2014-04-25T16:15:47-04:00",
    // product_type: "Snowboard",
    // published_at_max: "2014-04-25T16:15:47-04:00",
    // published_at_min: "2014-04-25T16:15:47-04:00",
    // published_status: "any",
    // updated_at_max: "2014-04-25T16:15:47-04:00",
    // updated_at_min: "2014-04-25T16:15:47-04:00",
    // vendor: "Burton"
  };
};
