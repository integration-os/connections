### Delete Tracking Category

Delete a tracking category in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteTrackingCategory)

**Sample Request**
```json
{
  "trackingCategoryID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "tenant1": {
    "trackingCategory": {
      "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
      "name": "Hello World",
      "status": "DELETED"
    }
  }
}
```
