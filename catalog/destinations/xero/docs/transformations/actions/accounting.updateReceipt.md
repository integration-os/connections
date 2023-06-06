### Update Receipt

Update a receipt in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateReceipt)

**Sample Payload**
```json
{
  "receiptID": "00000000-0000-0000-0000-000000000000",
  "unitdp": 4,
  "receipts": {
    "receipts": [
        {
            "reference": "Hello World",
            "receiptID": "00000000-0000-0000-0000-000000000000"
        }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "receipts": [
      {
        "receiptID": "00000000-0000-0000-0000-000000000000",
        "reference": "Hello World",
        "status": "DRAFT"
      }
    ]
  }
}
```
