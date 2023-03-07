# Creates a transaction for an order

Creates a transaction for an order.

**Caution**

For multi-currency orders, the currency property is required when creating refund and capture transactions. The value
should be the presentment currency from the order. For more information, refer to
the [Transaction resource](https://shopify.dev/docs/api/admin-rest/2023-01/resources/transaction).

**Requirements**

- Requires either `orders` or `marketplace_orders` access scopes.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/transaction)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798,
  "data": {
    "transaction":{
      "currency":"USD",
      "amount":"10.00",
      "kind":"capture",
      "parent_id":389404469
    }
  }
}
```

**Note:**`primaryResourceId` represents the order ID.

**Sample Response**

```json
{
  "transaction": {
    "id": 1068278467,
    "order_id": 450789469,
    "kind": "capture",
    "gateway": "bogus",
    "status": "success",
    "message": "Bogus Gateway: Forced success",
    "created_at": "2023-02-15T15:45:26-05:00",
    "test": true,
    "authorization": null,
    "location_id": null,
    "user_id": null,
    "parent_id": 389404469,
    "processed_at": "2023-02-15T15:45:26-05:00",
    "device_id": null,
    "error_code": null,
    "source_name": "755357713",
    "payment_details": {
      "credit_card_bin": null,
      "avs_result_code": null,
      "cvv_result_code": null,
      "credit_card_number": "•••• •••• •••• 4242",
      "credit_card_company": "Visa",
      "credit_card_name": null,
      "credit_card_wallet": null,
      "credit_card_expiration_month": null,
      "credit_card_expiration_year": null
    },
    "receipt": {},
    "currency_exchange_adjustment": null,
    "amount": "10.00",
    "currency": "USD",
    "payment_id": "c901414060.1",
    "total_unsettled_set": {
      "presentment_money": {
        "amount": "588.94",
        "currency": "USD"
      },
      "shop_money": {
        "amount": "588.94",
        "currency": "USD"
      }
    },
    "admin_graphql_api_id": "gid://shopify/OrderTransaction/1068278467"
  }
}
```