/**
 * ----------------------------------------------------------------------------------------------------
 * Update Product [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
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
