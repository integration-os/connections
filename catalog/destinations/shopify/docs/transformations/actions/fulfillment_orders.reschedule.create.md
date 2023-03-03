# Reschedule the fulfill_at time of a scheduled fulfillment order

Updates the `fulfill_at` time of a scheduled fulfillment order. This endpoint is used to manage the time a scheduled
fulfillment order will be marked as ready for fulfillment.

**Requirements**

- Requires access to protected customer data

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "fulfillment_order": {
      "new_fulfill_at": "2024-03-02 14:24 UTC"
    }
  }
}
```

**Note:** `primaryResourceId` represents the fulfillment order ID

**Sample Response**

```json
{
  "fulfillment_order": {
    "id": 1046000816,
    "shop_id": 548380009,
    "order_id": 450789469,
    "assigned_location_id": 24826418,
    "request_status": "unsubmitted",
    "status": "scheduled",
    "supported_actions": [
      "mark_as_open"
    ],
    "destination": {
      "id": 1046000811,
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
        "id": 1058737555,
        "shop_id": 548380009,
        "fulfillment_order_id": 1046000816,
        "quantity": 1,
        "line_item_id": 518995019,
        "inventory_item_id": 49148385,
        "fulfillable_quantity": 1,
        "variant_id": 49148385
      }
    ],
    "fulfillment_service_handle": "mars-fulfillment",
    "fulfill_at": "2024-03-02T09:24:00-05:00",
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