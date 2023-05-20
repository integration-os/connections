### Create Payment History

Creates one or more payment history records for a specified payment.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPaymentHistory)

**Sample Payload**
```json
{
  "paymentID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "HelloWorld",
        "dateUTC": "2020-12-10T00:00:00.000Z"
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
          "details": "HelloWorld",
          "dateUTC": "2020-12-10T00:00:00.000Z"
        }
      ]
    }
  ]
}
```
