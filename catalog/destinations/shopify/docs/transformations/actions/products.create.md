# Create a new product

Create a new product

**Requirements**

- Requires `products` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/product)

**Sample Payload**

```json
{
  "data": {
    "product": {
      "title": "Burton Custom Freestyle 151",
      "body_html": "<strong>Good snowboard!</strong>",
      "vendor": "Burton",
      "product_type": "Snowboard",
      "status": "draft"
    }
  }
}
```

**Sample Response**

```json
{
  "product": {
    "id": 1071559575,
    "title": "Burton Custom Freestyle 151",
    "body_html": "<strong>Good snowboard!</strong>",
    "vendor": "Burton",
    "product_type": "Snowboard",
    "created_at": "2023-02-02T09:27:41-05:00",
    "handle": "burton-custom-freestyle-151",
    "updated_at": "2023-02-02T09:27:41-05:00",
    "published_at": null,
    "template_suffix": null,
    "status": "draft",
    "published_scope": "web",
    "tags": "",
    "admin_graphql_api_id": "gid://shopify/Product/1071559575",
    "variants": [
      {
        "id": 1070325027,
        "product_id": 1071559575,
        "title": "Default Title",
        "price": "0.00",
        "sku": "",
        "position": 1,
        "inventory_policy": "deny",
        "compare_at_price": null,
        "fulfillment_service": "manual",
        "inventory_management": null,
        "option1": "Default Title",
        "option2": null,
        "option3": null,
        "created_at": "2023-02-02T09:27:41-05:00",
        "updated_at": "2023-02-02T09:27:41-05:00",
        "taxable": true,
        "barcode": null,
        "grams": 0,
        "image_id": null,
        "weight": 0,
        "weight_unit": "lb",
        "inventory_item_id": 1070325027,
        "inventory_quantity": 0,
        "old_inventory_quantity": 0,
        "presentment_prices": [
          {
            "price": {
              "amount": "0.00",
              "currency_code": "USD"
            },
            "compare_at_price": null
          }
        ],
        "requires_shipping": true,
        "admin_graphql_api_id": "gid://shopify/ProductVariant/1070325027"
      }
    ],
    "options": [
      {
        "id": 1055547177,
        "product_id": 1071559575,
        "name": "Title",
        "position": 1,
        "values": [
          "Default Title"
        ]
      }
    ],
    "images": [],
    "image": null
  }
}
```


