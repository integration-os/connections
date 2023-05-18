### Delete Tracking Options

Delete a tracking option in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteTrackingOptions)

**Sample Request**
```json
{
  "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
  "trackingOptionID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "responses": [
    {
      "trackingCategory": {
        "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
        "name": "Hello World",
        "options": [
          {
            "trackingOptionID": "00000000-0000-0000-0000-000000000000",
            "name": "Hello World"
          }
        ]
      }
    }
  ]
}
```


