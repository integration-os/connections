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
  "responses": [
    {
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "TrackingOption": {
        "trackingOptionID": "00000000-0000-0000-0000-000000000000",
        "name": "Test Tracking Option"
      }
    }
  ]
}
```
