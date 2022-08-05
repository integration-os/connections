const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    ACCESS_TOKEN: $env.BUILDABLE_SHOPIFY_ACCESS_TOKEN, // Required
    STORE_URL: $env.BUILDABLE_SHOPIFY_STORE_URL, // Required
    order: {
      // Required
      line_items: [
        {
          variant_id: "41430460366998",
          quantity: 2,
          // "fulfillment_service": "manual",
          // "fulfillment_status": "fulfilled",
          // "grams": 500,
          // "id": "",
          // "price": "99.99",
          // "price_set": "",
          // "product_id": "",
          // "requires_shipping": true,
          // "sku": 10,
          // "title": "",
          // "vendor": "",
          // "name": "",
          // "gift_card": false,
          // "properties": [],
          // "taxable": true,
          // "tax_lines": [
          //   {
          //     "title": "State tax",
          //     "price": "10.00",
          //     "rate": 0.01,
          //     "price_set": "",
          //     "channel_liable": ""
          //   }
          // ],
          // "tip_payment_gateway": "",
          // "tip_payment_method": "",
          // "total_discount": "15.00",
          // "total_discount_set": "",
          // "discount_allocations": {
          //   "amount": "15.00",
          //   "discount_application_index": "",
          //   "amount_set": ""
          // },
          // "origin_location": {
          //   "id": "",
          //   "country_code": "",
          //   "province_code": "",
          //   "name": "",
          //   "address1": "",
          //   "address2": "",
          //   "city": "",
          //   "zip": ""
          // }
        },
      ],

      // "email": "johndoe@gmail.com",
      // "fulfillment_status": "fulfilled",
      // "send_receipt": true,
      // "send_fulfillment_receipt": true,
      // "fulfillments": [
      //   {
      //     "location_id": 24826418
      //   }
      // ],
      // "transactions": [
      //   {
      //     "kind": "sale",
      //     "status": "success",
      //     "amount": 238.47
      //   }
      // ],
      // "total_tax": 13.5,
      // "currency": "EUR",
      // "tax_lines": [
      //   {
      //     "price": 10.2,
      //     "rate": 0.06,
      //     "title": "State tax",
      //     "channel_liable": ""
      //   },
      //   {
      //     "price": 4.25,
      //     "rate": 0.025,
      //     "title": "County tax",
      //     "channel_liable": ""
      //   }
      // ],
      // "customer": {
      //   "id": 207119551,
      //   "first_name": "Paul",
      //   "last_name": "Norman",
      //   "email": "paul.norman@example.com"
      // },
      // "financial_status": "pending",
      // "billing_address": {
      //   "first_name": "John",
      //   "last_name": "Smith",
      //   "address1": "123 Fake Street",
      //   "address2": "123 Fake Street",
      //   "phone": "555-555-5555",
      //   "city": "Fakecity",
      //   "province": "Ontario",
      //   "country": "Canada",
      //   "zip": "K2P 1L4",
      //   "company": "",
      //   "country_code": "",
      //   "latitude": "",
      //   "longitude": "",
      //   "name": "",
      //   "province_code": ""
      // },
      // "shipping_address": {
      //   "first_name": "John",
      //   "last_name": "Smith",
      //   "address1": "123 Fake Street",
      //   "address2": "123 Fake Street",
      //   "phone": "555-555-5555",
      //   "city": "Fakecity",
      //   "province": "Ontario",
      //   "country": "Canada",
      //   "zip": "K2P 1L4",
      //   "company": "",
      //   "country_code": "",
      //   "latitude": "",
      //   "longitude": "",
      //   "name": "",
      //   "province_code": ""
      // },
      // "discount_codes": [
      //   {
      //     "code": "FAKE30",
      //     "amount": "9.00",
      //     "type": "percentage"
      //   }
      // ]
    },
  };
};
