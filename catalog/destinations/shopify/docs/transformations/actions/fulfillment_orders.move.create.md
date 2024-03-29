# Move a fulfillment order to a new location

Moves a fulfillment order from one location to another location.

**Requirements**

- Requires access to protected customer data
- Requires `merchant_managed_fulfillment_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "fulfillment_move": {
      "new_location_id": 123456789
    }
  }
}
```

**Note:** `primaryResourceId` represents the fulfillment order ID

**Sample Response**

```json
{
  "original_fulfillment_order": {
    "id": 1046000818,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 487838322,
    "request_status": "submitted",
    "status": "closed",
    "supported_actions": [],
    "destination": {
      "id": 1046000813,
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
        "id": 1058737557,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000818,
        "quantity": 1,
        "line_item_id": 518995019,
        "inventory_item_id": 49148385,
        "fulfillable_quantity": 1,
        "variant_id": 49148385
      }
    ],
    "fulfillment_service_handle": "manual",
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
  "moved_fulfillment_order": {
    "id": 1046000819,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 655441491,
    "request_status": "unsubmitted",
    "status": "open",
    "supported_actions": [
      "create_fulfillment",
      "move"
    ],
    "destination": {
      "id": 1046000814,
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
        "id": 1058737558,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000819,
        "quantity": 1,
        "line_item_id": 518995019,
        "inventory_item_id": 49148385,
        "fulfillable_quantity": 1,
        "variant_id": 49148385
      }
    ],
    "fulfillment_service_handle": "manual",
    "assigned_location": {
      "address1": "50 Rideau Street",
      "address2": null,
      "city": "Ottawa",
      "country_code": "CA",
      "location_id": 655441491,
      "name": "50 Rideau Street",
      "phone": null,
      "province": "Ontario",
      "zip": "K1N 9J7"
    },
    "merchant_requests": []
  },
  "remaining_fulfillment_order": null
}
```

