### Create Receipt History

Create a history record for a receipt.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createReceiptHistory)

**Sample Payload**
```json
{
  "receiptID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": [
    {
      "details": "HelloWorld",
      "dateUTC": "/Date(1684354973404)/"
    }
  ]
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
          "historyRecordID": "00000000-0000-0000-0000-000000000000",
          "details": "HelloWorld",
          "dateUTC": "/Date(1684354973404)/"
        }
      ]
    }
  ]
}
```
