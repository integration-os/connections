const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    productId: "7371280023702", // Required
  };
};
