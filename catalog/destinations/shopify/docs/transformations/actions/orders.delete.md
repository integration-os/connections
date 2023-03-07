# Delete an order

Deletes an order. Orders that interact with an online gateway can't be deleted.

**Requirements**

- Requires access to protected customer data
- Requires `orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/order)

**Sample Payload**

```json
{
  "primaryResourceId": 123465798
}
```

**Note:**`primaryResourceId` represents the order ID.

**Sample Response**

```json
{}
```