const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    orderId: "4457263399062", // Required

    // amount: "199.98",
    // currency: "INR",
    // refund: {
    // "note": "Customer made a mistake",
    // "shipping": {
    //   "full_refund": true
    // },
    // "refund_line_items": [
    //   {
    //     "line_item_id": 466157049,
    //     "quantity": 1,
    //     "restock_type": "cancel",
    //     "location_id": 24826418
    //   }
    // ],
    // "transactions": [
    //   {
    //     "parent_id": 1068278509,
    //     "amount": "10.00",
    //     "kind": "refund",
    //     "gateway": "bogus"
    //   },
    //   {
    //     "parent_id": 1068278510,
    //     "amount": "100.00",
    //     "kind": "refund",
    //     "gateway": "gift_card"
    //   }
    // ]
    // }
  };
};
