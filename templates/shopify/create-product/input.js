const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required

    // Required
    product: {
      title: "Burton Custom Freestyle 151", // Required

      // body_html: "<strong>Good snowboard!</strong>",
      // vendor: "Burton",
      // product_type: "Snowboard",
      // tags: ["Barnes & Noble", "Big Air", "John's Fav"],
      // status: "active",
      // variants:
      //   [
      //     { option1: "Blue", option2: "155" },
      //     { option1: "Black", option2: "159" }
      //   ]
      // ,
      // options: [
      //   { name: "Color", values: ["Blue", "Black"] },
      //   { name: "Size", values: ["155", "159"] }
      // ],
      // images: [
      //   {
      //     "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Snowboard_pow.jpg/1200px-Snowboard_pow.jpg"
      //   }
      // ]
    },
  };
};
