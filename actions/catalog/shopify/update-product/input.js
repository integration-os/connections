const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    product: {
      id: "7372073861270", // Required

      title: "Burton Custom Freestyle 152",
      // body_html: "<strong>Good snowboard!</strong>",
      // vendor: "Burton",
      // product_type: "Snowboard",
      // tags: ["Barnes & Noble", "Big Air", "John's Fav"],
      // status: "active",
      // variants:
      //   [
      //     { "id": "41427240255638", option1: "Blue", option2: "155" },
      //     { "id": "41427240288406" }
      //   ],
      // images: []
    },
  };
};
