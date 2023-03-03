# Modify an existing Product Variant

Updates an existing product variant

**Requirements**

- Requires `products` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/product-variant)

**Sample Payload**

```json
{
  "primaryResourceId": 632910392,
  "data": {
    "variant": {
      "id": 808950810,
      "metafields": [
        {
          "key": "new",
          "value": "newvalue",
          "type": "single_line_text_field",
          "namespace": "global"
        }
      ]
    }
  }
}
```

**Note:** The `primaryResourceId` is the `id` of the product to update the variant for.

**Sample Response**

```json
{
  "variant": {
    "id": 808950810,
    "product_id": 632910392,
    "title": "Pink",
    "price": "199.00",
    "sku": "IPOD2008PINK",
    "position": 1,
    "inventory_policy": "continue",
    "compare_at_price": null,
    "fulfillment_service": "manual",
    "inventory_management": "shopify",
    "option1": "Pink",
    "option2": null,
    "option3": null,
    "created_at": "2023-02-14T06:20:04-05:00",
    "updated_at": "2023-02-14T06:21:23-05:00",
    "taxable": true,
    "barcode": "1234_pink",
    "grams": 567,
    "image_id": 562641783,
    "weight": 1.25,
    "weight_unit": "lb",
    "inventory_item_id": 808950810,
    "inventory_quantity": 10,
    "old_inventory_quantity": 10,
    "presentment_prices": [
      {
        "price": {
          "amount": "199.00",
          "currency_code": "USD"
        },
        "compare_at_price": null
      }
    ],
    "requires_shipping": true,
    "admin_graphql_api_id": "gid://shopify/ProductVariant/808950810"
  }
}
```