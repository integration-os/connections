### Update Tracking Options

Update a tracking option in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateTrackingOptions)

**Sample Payload**
```json
{
  "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
  "trackingOptionID": "00000000-0000-0000-0000-000000000000",
  "trackingOption": {
    "name": "Hello World"
  }
}
```

**Sample Response**
```json
{
  "options": [
    {
      "trackingOptionID": "00000000-0000-0000-0000-000000000000",
      "name": "Hello World",
      "status": "ACTIVE"
    }
  ]
}
```
