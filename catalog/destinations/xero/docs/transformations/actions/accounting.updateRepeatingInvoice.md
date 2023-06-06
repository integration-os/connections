### Update Repeating Invoice

Update a repeating invoice in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateRepeatingInvoice)

**Sample Payload**
```json
{
  "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000",
  "repeatingInvoices": {
    "repeatingInvoices": [
      {
        "reference": "Hello World",
        "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1:": {
    "repeatingInvoices": [
      {
        "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000",
        "reference": "Hello World",
        "status": "DRAFT"
      }
    ]
  }
}
```
