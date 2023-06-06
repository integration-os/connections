### Create Tracking Options

Create one or more tracking options.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createTrackingOptions)

**Sample Request**
```json
{
  "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
  "trackingOption": {
    "name": "Test Tracking Option"
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "trackingOption": {
      "trackingOptionID": "00000000-0000-0000-0000-000000000000",
      "name": "Test Tracking Option"
    }
  }
}
```
