# Calculates a refund

Calculates refund transactions based on line items and shipping.

When you want to create a refund, you should first use the calculate endpoint to generate accurate refund transactions.
Specify the line items that are being refunded, their quantity and restock instructions, and whether you intend to
refund shipping costs. If the restock instructions can't be met—for example, because you try to return more items than
have been fulfilled—then the endpoint returns modified restock instructions. You can then use the response in the body
of the request to create the actual refund.

**Requirements**

- Requires either `orders` or `marketplace_orders` access scopes.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/refund)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798,
  "data": {
    "refund": {
      "currency": "USD",
      "shipping": {
        "amount": 2.0
      }
    }
  }
}
```

**Note:**`primaryResourceId` represents the order ID.

**Sample Response**

```json
{
  "refund": {
    "shipping": {
      "amount": "2.00",
      "tax": "0.00",
      "maximum_refundable": "5.00"
    },
    "duties": [],
    "total_duties_set": {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    "additional_fees": [],
    "total_additional_fees_set": {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    "return": null,
    "refund_line_items": [],
    "transactions": [
      {
        "order_id": 450789469,
        "kind": "suggested_refund",
        "gateway": "bogus",
        "parent_id": 801038806,
        "amount": "2.00",
        "currency": "USD",
        "maximum_refundable": "41.94"
      }
    ],
    "currency": "USD"
  }
}
```