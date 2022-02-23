/**
 * ----------------------------------------------------------------------------------------------------
 * List Products [Input]
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

    // page: 1,
    // limit: 10, // ≤ 250 default 50
    // collection_id: "",
    // created_at_max: "2024-04-25T16:15:47-04:00",
    // created_at_min: "2014-04-25T16:15:47-04:00",
    // fields: "title, images",
    // handle: "",
    // ids: "",
    // presentment_currencies: "",
    // product_type: "Snowboard",
    // published_at_max: "2014-04-25T16:15:47-04:00",
    // published_at_min: "2014-04-25T16:15:47-04:00",
    // published_status: "any",
    // since_id: 7371189190806,
    // status: "active",
    // title: "",
    // updated_at_max: "2014-04-25T16:15:47-04:00",
    // updated_at_min: "2014-04-25T16:15:47-04:00",
    // vendor: "Burton"
  };
};
