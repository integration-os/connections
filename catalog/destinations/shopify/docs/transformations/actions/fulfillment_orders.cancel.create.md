# Cancel a Fulfillment Order

Marks a fulfillment order as cancelled.

**Requirements**

- Requires access to protected customer data

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789
}
```

**Sample Response**

```json
{
  "fulfillment_order": {
    "id": 1046000814,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 24826418,
    "request_status": "submitted",
    "status": "closed",
    "supported_actions": [],
    "destination": {
      "id": 1046000809,
      "address1": "Chestnut Street 92",
      "address2": "",
      "city": "Louisville",
      "company": null,
      "country": "United States",
      "email": "bob.norman@mail.example.com",
      "first_name": "Bob",
      "last_name": "Norman",
      "phone": "+1(502)-459-2181",
      "province": "Kentucky",
      "zip": "40202"
    },
    "line_items": [],
    "fulfillment_service_handle": "mars-fulfillment",
    "assigned_location": {
      "address1": null,
      "address2": null,
      "city": null,
      "country_code": "DE",
      "location_id": 24826418,
      "name": "Apple Api Shipwire",
      "phone": null,
      "province": null,
      "zip": null
    },
    "merchant_requests": []
  },
  "replacement_fulfillment_order": {
    "id": 1046000815,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 24826418,
    "request_status": "unsubmitted",
    "status": "open",
    "supported_actions": [
      "request_fulfillment",
      "create_fulfillment"
    ],
    "destination": {
      "id": 1046000810,
      "address1": "Chestnut Street 92",
      "address2": "",
      "city": "Louisville",
      "company": null,
      "country": "United States",
      "email": "bob.norman@mail.example.com",
      "first_name": "Bob",
      "last_name": "Norman",
      "phone": "+1(502)-459-2181",
      "province": "Kentucky",
      "zip": "40202"
    },
    "line_items": [
      {
        "id": 1058737554,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000815,
        "quantity": 1,
        "line_item_id": 518995019,
        "inventory_item_id": 49148385,
        "fulfillable_quantity": 1,
        "variant_id": 49148385
      }
    ],
    "fulfillment_service_handle": "mars-fulfillment",
    "assigned_location": {
      "address1": null,
      "address2": null,
      "city": null,
      "country_code": "DE",
      "location_id": 24826418,
      "name": "Apple Api Shipwire",
      "phone": null,
      "province": null,
      "zip": null
    },
    "merchant_requests": []
  }
}
```