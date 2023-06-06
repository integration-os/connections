### Update Tracking Category

Update a tracking category in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateTrackingCategory)

**Sample Payload**

```json
{
  "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
  "trackingCategory": {
    "name": "Hello World",
    "trackingCategoryID": "00000000-0000-0000-0000-000000000000"
  }
}
```

**Sample Response**

```json
{
  "tenant1": {
    "trackingCategory": {
      "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
      "name": "Hello World",
      "status": "ACTIVE"
    }
  }
}
```
