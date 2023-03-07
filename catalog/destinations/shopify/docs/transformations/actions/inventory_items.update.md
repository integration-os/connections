# Update an existing inventory item

Updates an existing inventory item

**Requirements**

- Requires `inventory` access scope.

[Documentation](https://shopify.dev/docs/admin-api/rest/reference/inventory/inventoryitem)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "inventory_item": {
      "id": 808950810,
      "sku": "new sku"
    }
  }
}
```

**Note:** `primaryResourceId` represents the inventory item ID

**Sample Response**

```json
{
  "inventory_item": {
    "id": 808950810,
    "sku": "new sku",
    "created_at": "2023-02-02T09:53:49-05:00",
    "updated_at": "2023-02-02T09:55:54-05:00",
    "requires_shipping": true,
    "cost": "25.00",
    "country_code_of_origin": null,
    "province_code_of_origin": null,
    "harmonized_system_code": null,
    "tracked": true,
    "country_harmonized_system_codes": [],
    "admin_graphql_api_id": "gid://shopify/InventoryItem/808950810"
  }
}
```
