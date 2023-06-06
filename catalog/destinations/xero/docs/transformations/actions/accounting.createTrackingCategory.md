### Create Tracking Categories

Create one or more tracking categories.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createTrackingCategory)

**Sample Request**
```json
{
  "trackingCategory": {
    "name": "Test Tracking Category",
    "status": "ACTIVE"
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "trackingCategories": [
      {
        "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
        "name": "Test Tracking Category",
        "status": "ACTIVE"
      }
    ]
  }
}
```
