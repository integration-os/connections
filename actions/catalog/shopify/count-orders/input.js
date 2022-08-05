const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required

    // status: "any"
    // financial_status: "",
    // fulfillment_status: "",
    // created_at_max: "2024-04-25T16:15:47-04:00",
    // created_at_min: "2014-04-25T16:15:47-04:00",
    // updated_at_max: "2014-04-25T16:15:47-04:00",
    // updated_at_min: "2014-04-25T16:15:47-04:00"
  };
};
