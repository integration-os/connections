# Delete a Draft Order

Deletes a drafted order

**Requirements**

- Requires access to protected customer data
- Requires `draft_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/draftorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789
}
```

**Note:** `primaryResourceId` represents the draft order ID

**Sample Response**

```json
{}
```
