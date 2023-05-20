### Create Credit Note Allocation

Create credit note allocations in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createCreditNoteAllocation)

**Sample Payload**
```json
{
  "creditNotID": "00000000-0000-0000-0000-000000000000",
  "summarizeErrors": true,
  "allocations": {
    "allocations": [
      {
        "amount": 1,
        "date": "2020-12-10",
        "invoice": {
          "invoiceID": "00000000-0000-0000-0000-000000000000"
        }
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
      "allocations": [
        {
          "amount": 1,
          "date": "2020-12-10",
          "invoice": {
            "invoiceID": "00000000-0000-0000-0000-000000000000"
          }
        }
      ]
    }
  ]
}
```
