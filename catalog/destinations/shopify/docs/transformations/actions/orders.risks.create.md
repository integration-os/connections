# Order Risk

Creates an order risk for an order

**Requirements**

- Requires `orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/order-risk)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798,
  "data": {
    "risk":{
      "message":"This order came from an anonymous proxy",
      "recommendation":"cancel",
      "score":1.0,
      "source":"External",
      "cause_cancel":true,
      "display":true
    }
  }
}
```

**Note:**`primaryResourceId` represents the order ID.

**Sample Response**

```json
{
  "risk": {
    "id": 1029151489,
    "order_id": 450789469,
    "checkout_id": 901414060,
    "source": "External",
    "score": "1.0",
    "recommendation": "cancel",
    "display": true,
    "cause_cancel": true,
    "message": "This order came from an anonymous proxy",
    "merchant_message": "This order came from an anonymous proxy"
  }
}
```
