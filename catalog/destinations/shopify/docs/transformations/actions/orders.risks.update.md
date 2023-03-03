# Updates an order risk

Updates an order risk

**Requirements**

- Requires `orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/order-risk)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798,
  "data": {
    "risk": {
      "id": 284138680,
      "message": "After further review, this is a legitimate order",
      "recommendation": "accept",
      "source": "External",
      "cause_cancel": false,
      "score": 0.0
    }
  }
}
```

**Note:**`primaryResourceId` represents the order ID.

**Sample Response**

```json
{
  "risk": {
    "order_id": 450789469,
    "cause_cancel": false,
    "message": "After further review, this is a legitimate order",
    "recommendation": "accept",
    "score": "0.0",
    "source": "External",
    "id": 284138680,
    "checkout_id": null,
    "display": true,
    "merchant_message": "After further review, this is a legitimate order"
  }
}
```
