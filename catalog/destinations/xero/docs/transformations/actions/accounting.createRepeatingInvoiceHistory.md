### Create Repeating Invoice History

Create a history record for a repeating invoice.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createRepeatingInvoiceHistory)

**Sample Payload**
```json
{
  "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000",
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
  "tenant1": {
    "historyRecords": [
      {
        "historyRecordID": "00000000-0000-0000-0000-000000000000",
        "details": "HelloWorld",
        "dateUTC": "/Date(1684354973404)/"
      }
    ]
  }
}
```

