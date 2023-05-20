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
      "prepaymentAllocations": [
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
