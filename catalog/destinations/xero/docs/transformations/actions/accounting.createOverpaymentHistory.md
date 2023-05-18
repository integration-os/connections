### Create Overpayment History

Creates one or more overpayment history records for a specified overpayment.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createOverpaymentHistory)

**Sample Payload**
```json
{
  "overpaymentID": "00000000-0000-0000-0000-000000000000",
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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "HistoryRecords": [
        {
          "details": "HelloWorld",
          "dateUTC": "2020-12-10T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

