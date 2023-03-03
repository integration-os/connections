# Apply a fulfillment hold on an open fulfillment order

Halts all fulfillment work on a fulfillment order with status OPEN and changes the status of the fulfillment order to
ON_HOLD.

**Requirements**

- Requires access to protected customer data

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "fulfillment_hold": {
      "reason": "inventory_out_of_stock",
      "reason_notes": "Not enough inventory to complete this work."
    }
  }
}
```

**Sample Response**

```json
{
  "fulfillment_order": {
    "id": 1046000821,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 24826418,
    "request_status": "unsubmitted",
    "status": "on_hold",
    "supported_actions": [
      "release_hold"
    ],
    "destination": {
      "id": 1046000816,
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
        "id": 1058737560,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000821,
        "quantity": 1,
        "line_item_id": 518995019,
        "inventory_item_id": 49148385,
        "fulfillable_quantity": 1,
        "variant_id": 49148385
      }
    ],
    "fulfill_at": null,
    "international_duties": {
      "incoterm": "DAP"
    },
    "fulfillment_holds": [
      {
        "reason": "inventory_out_of_stock",
        "reason_notes": "Not enough inventory to complete this work."
      }
    ],
    "delivery_method": null,
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

