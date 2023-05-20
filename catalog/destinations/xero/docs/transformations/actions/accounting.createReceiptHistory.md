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
      "historyRecords": [
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
