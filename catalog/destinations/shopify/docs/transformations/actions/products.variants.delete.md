# Remove an existing Product Variant

Deletes an existing product variant

**Requirements**

- Requires `products` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/product-variant)

**Sample Payload**

```json
{
  "primaryResourceId": 632910392
}
```

**Note:** The `primaryResourceId` is the `id` of the product variant to delete.

**Sample Response**

```json
{}
```