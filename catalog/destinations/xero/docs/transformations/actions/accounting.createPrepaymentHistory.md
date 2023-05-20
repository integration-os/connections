### Create Prepayment History

Creates a history record for a prepayment.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPrepaymentHistory)

**Sample Payload**
```json
{
  "prepaymentID": "00000000-0000-0000-0000-000000000000",
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
      "historyRecords": [
        {
          "details": "HelloWorld"
        }
      ]
    }
  ]
}
```

