### Create Prepayment Allocations

Creates one or more prepayment allocations for a specified prepayment.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPrepaymentAllocations)

**Sample Payload**
```json
{
  "prepaymentID": "00000000-0000-0000-0000-000000000000",
  "summarizeErrors": true,
  "allocations": {
    "allocations": [
      {
        "invoice": {
          "invoiceID": "00000000-0000-0000-0000-000000000000"
        },
        "amount": 0,
        "date": "2020-12-10T00:00:00.000Z"
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
      "PrepaymentAllocations": [
        {
          "invoice": {
            "invoiceID": "00000000-0000-0000-0000-000000000000"
          },
          "amount": 0,
          "date": "2020-12-10T00:00:00.000Z"
        }
      ]
    }
  ]
}
```
