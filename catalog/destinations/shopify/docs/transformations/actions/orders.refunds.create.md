# Creates a refund

Creates a refund. Use the `calculate` endpoint to produce the transactions to submit.

**Caution**

For multi-currency orders, the currency property is required whenever the amount property is provided.

**Requirements**

- Requires either `orders` or `marketplace_orders` access scopes.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/refund)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798,
  "data": {
    "refund":{
      "currency":"USD",
      "notify":true,
      "note":"wrong size",
      "shipping":{
        "full_refund":true
      },
      "refund_line_items":[
        {
          "line_item_id":518995019,
          "quantity":1,
          "restock_type":"return",
          "location_id":487838322
        }
      ],
      "transactions":[
        {
          "parent_id":801038806,
          "amount":41.94,
          "kind":"refund",
          "gateway":"bogus"
        }
      ]
    }
  }
}
```

**Sample Response**

```json
{
  "refund": {
    "id": 929361465,
    "order_id": 450789469,
    "created_at": "2023-02-02T09:55:44-05:00",
    "note": "wrong size",
    "user_id": null,
    "processed_at": "2023-02-02T09:55:44-05:00",
    "restock": false,
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
    "admin_graphql_api_id": "gid://shopify/Refund/929361465",
    "refund_line_items": [
      {
        "location_id": null,
        "restock_type": "no_restock",
        "quantity": 1,
        "id": 1058498312,
        "line_item_id": 518995019,
        "subtotal": 195.67,
        "total_tax": 3.98,
        "subtotal_set": {
          "shop_money": {
            "amount": "195.67",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "195.67",
            "currency_code": "USD"
          }
        },
        "total_tax_set": {
          "shop_money": {
            "amount": "3.98",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "3.98",
            "currency_code": "USD"
          }
        },
        "line_item": {
          "id": 518995019,
          "variant_id": 49148385,
          "title": "IPod Nano - 8gb",
          "quantity": 1,
          "sku": "IPOD2008RED",
          "variant_title": "red",
          "vendor": null,
          "fulfillment_service": "manual",
          "product_id": 632910392,
          "requires_shipping": true,
          "taxable": true,
          "gift_card": false,
          "name": "IPod Nano - 8gb - red",
          "variant_inventory_management": "shopify",
          "properties": [],
          "product_exists": true,
          "fulfillable_quantity": 1,
          "grams": 200,
          "price": "199.00",
          "total_discount": "0.00",
          "fulfillment_status": null,
          "price_set": {
            "shop_money": {
              "amount": "199.00",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "199.00",
              "currency_code": "USD"
            }
          },
          "total_discount_set": {
            "shop_money": {
              "amount": "0.00",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "0.00",
              "currency_code": "USD"
            }
          },
          "discount_allocations": [
            {
              "amount": "3.33",
              "discount_application_index": 0,
              "amount_set": {
                "shop_money": {
                  "amount": "3.33",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "3.33",
                  "currency_code": "USD"
                }
              }
            }
          ],
          "duties": [],
          "admin_graphql_api_id": "gid://shopify/LineItem/518995019",
          "tax_lines": [
            {
              "title": "State Tax",
              "price": "3.98",
              "rate": 0.06,
              "channel_liable": null,
              "price_set": {
                "shop_money": {
                  "amount": "3.98",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "3.98",
                  "currency_code": "USD"
                }
              }
            }
          ]
        }
      }
    ],
    "transactions": [
      {
        "id": 1068278489,
        "order_id": 450789469,
        "kind": "refund",
        "gateway": "bogus",
        "status": "success",
        "message": "Bogus Gateway: Forced success",
        "created_at": "2023-02-02T09:55:44-05:00",
        "test": true,
        "authorization": null,
        "location_id": null,
        "user_id": null,
        "parent_id": 801038806,
        "processed_at": "2023-02-02T09:55:44-05:00",
        "device_id": null,
        "error_code": null,
        "source_name": "755357713",
        "receipt": {},
        "amount": "41.94",
        "currency": "USD",
        "payment_id": "c901414060.1",
        "admin_graphql_api_id": "gid://shopify/OrderTransaction/1068278489"
      }
    ],
    "order_adjustments": []
  }
}
```
