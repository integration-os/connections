/**
 * ----------------------------------------------------------------------------------------------------
 * List Orders [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://help.shopify.com/api/reference/order
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
