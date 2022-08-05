const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required

    // page: 1,
    // limit: 10, // ≤ 250 default 50
    // attribution_app_id: "",
    // financial_status: "authorized",
    // fulfillment_status: "",
    // created_at_max: "2005-07-31T15:57:11-04:00",
    // created_at_min: "2005-07-31T15:57:11-04:00",
    // processed_at_max: "2005-07-31T15:57:11-04:00",
    // processed_at_min: "2005-07-31T15:57:11-04:00",
    // updated_at_min: "2005-07-31T15:57:11-04:00",
    // updated_at_max: "2005-07-31T15:57:11-04:00",
    // status: "any",
    // fields: "id,list_items",
    // ids: "",
    // since_id: "7371189190806"
  };
};
