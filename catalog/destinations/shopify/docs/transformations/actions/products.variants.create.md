# Create a new Product Variant

**IMPORTANT**

Apps can no longer set inventory using `inventory_quantity` or `inventory_quantity_adjustment`. For more information,
refer to the [Inventory Level](https://shopify.dev/docs/api/admin-rest/2023-01/resources/inventorylevel) resource.

Creates a new product variant

**Requirements**

- Requires `products` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/product-variant)

**Sample Payload**

```json
{
  "primaryResourceId": 632910392,
  "data": {
    "variant": {
      "option1": "Yellow",
      "price": "1.00"
    }
  }
}
```

**Note:** The `primaryResourceId` is the `id` of the product to create the variant for.

**Sample Response**

```json
{
  "variant": {
    "id": 1070325025,
    "product_id": 632910392,
    "title": "Yellow",
    "price": "1.00",
    "sku": "",
    "position": 5,
    "inventory_policy": "deny",
    "compare_at_price": null,
    "fulfillment_service": "manual",
    "inventory_management": "shopify",
    "option1": "Yellow",
    "option2": null,
    "option3": null,
    "created_at": "2023-02-14T06:21:18-05:00",
    "updated_at": "2023-02-14T06:21:18-05:00",
    "taxable": true,
    "barcode": null,
    "grams": 0,
    "image_id": null,
    "weight": 0,
    "weight_unit": "lb",
    "inventory_item_id": 1070325025,
    "inventory_quantity": 0,
    "old_inventory_quantity": 0,
    "presentment_prices": [
      {
        "price": {
          "amount": "1.00",
          "currency_code": "USD"
        },
        "compare_at_price": null
      }
    ],
    "requires_shipping": true,
    "admin_graphql_api_id": "gid://shopify/ProductVariant/1070325025"
  }
}
```
