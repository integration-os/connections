const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    order: {
      id: "4457167224982", // Required

      // note: "Customer contacted us about a custom engraving on this iPod",
      //   note_attributes: [
      //     {
      //       name: "colour",
      //       value: "red",
      //     },
      //   ],
      //   email: "a-different@email.com",
      //   phone: "+15145556677",
      // "buyer_accepts_marketing": true,
      // "shipping_address":
      // {
      //   "address1": "123 Ship Street",
      //   "address2": "",
      //   "city": "Shipsville",
      //   "company": "",
      //   "country": "",
      //   "country_code": "",
      //   "first_name": "",
      //   "last_name": "",
      //   "latitude": "",
      //   "longitude": "",
      //   "name": "",
      //   "phone": "",
      //   "province": "",
      //   "province_code": "",
      //   "zip": ""
      // },
      // customer: null,
      // "tags": "External, Inbound, Outbound",
      // "metafields": [
      //   {
      //     "key": "new",
      //     "value": "newvalue",
      //     "type": "single_line_text_field",
      //     "namespace": "global"
      //   }
      // ]
    },
  };
};
