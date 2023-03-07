# Updates a report

Updates a report

**Requirements**

- Requires `reports` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/report)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "report": {
      "id": 517154478,
      "name": "Changed Report Name",
      "shopify_ql": "SHOW total_sales BY order_id FROM sales SINCE -12m UNTIL today ORDER BY total_sales"
    }
  }
}
```

**Note:** The `primaryResourceId` is the `id` of the report to update.

**Sample Response**

```json
{
  "report": {
    "name": "Changed Report Name",
    "shopify_ql": "SHOW total_sales BY order_id FROM sales SINCE -12m UNTIL today ORDER BY total_sales",
    "id": 517154478,
    "updated_at": "2023-02-02T09:14:24-05:00",
    "category": "custom_app_reports"
  }
}
```
