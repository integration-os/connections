# Delete a product

Deletes a product.

**Requirements**

- Requires `products` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/product)

**Sample Payload**

```json
{
  "primaryResourceId": 132465798
}
```

**Note:** The `primaryResourceId` is the `id` of the product to delete.

**Sample Response**

```json
{}
```