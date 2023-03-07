# Creates a new report

Creates a new report

**Requirements**

- Requires `reports` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/report)

**Sample Payload**

```json
{
  "data": {
    "report": {
      "name": "A new app report",
      "shopify_ql": "SHOW total_sales BY order_id FROM sales SINCE -1m UNTIL today ORDER BY total_sales"
    }
  }
}
```

**Sample Response**

```json
{
  "report": {
    "id": 1016888664,
    "name": "A new app report",
    "shopify_ql": "SHOW total_sales BY order_id FROM sales SINCE -1m UNTIL today ORDER BY total_sales",
    "updated_at": "2023-02-02T09:14:18-05:00",
    "category": "custom_app_reports"
  }
}
```
