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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "Allocations": [
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
