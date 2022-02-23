/**
 * ----------------------------------------------------------------------------------------------------
 * Create Product [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://help.shopify.com/api/reference/product
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    ACCESS_TOKEN: $trigger.env.SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $trigger.env.SHOPIFY_STORE_URL, // Required

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
