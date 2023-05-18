### Create Purchase Order History

Creates a history record for a purchase order.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPurchaseOrderHistory)

**Sample Payload**
```json
{
  "purchaseOrderID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "HelloWorld"
      }
    ]
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
      "HistoryRecords": [
        {
          "details": "HelloWorld"
        }
      ]
    }
  ]
}
```
