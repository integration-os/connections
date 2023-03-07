# Mark a fulfillment order as incomplete

Marks an in progress fulfillment order as incomplete, indicating the fulfillment service is unable to ship any remaining
items and intends to close the fulfillment order.

**Requirements**

- Requires access to protected customer data
- Requires `assigned_fulfillment_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "fulfillment_order": {
      "message": "Not enough inventory to complete this work."
    }
  }
}
```

**Note:** `primaryResourceId` represents the fulfillment order ID

**Sample Response**

```json
{
  "fulfillment_order": {
    "id": 1046000810,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 24826418,
    "request_status": "closed",
    "status": "incomplete",
    "supported_actions": [
      "request_fulfillment",
      "create_fulfillment"
    ],
    "destination": {
      "id": 1046000805,
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
        "id": 1058737550,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000810,
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