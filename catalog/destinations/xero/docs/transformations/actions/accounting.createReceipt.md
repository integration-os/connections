### Create Receipt

Creates a receipt.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createReceipt)

**Sample Payload**
```json
{
  "unitdp": 4,
  "receipts": {
    "receipts": [
      {
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "user": {
          "userID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": [
          {
            "description": "HelloWorld",
            "quantity": 0,
            "unitAmount": 0,
            "accountCode": "00000000-0000-0000-0000-000000000000"
          }
        ],
        "lineAmountType": "EXCLUSIVE",
        "status": "DRAFT"
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
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "user": {
          "userID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": [
          {
            "description": "HelloWorld",
            "quantity": 0,
            "unitAmount": 0,
            "accountCode": "00000000-0000-0000-0000-000000000000"
          }
        ],
        "lineAmountType": "EXCLUSIVE",
        "status": "DRAFT"
      }
    ]
  }
}
```
