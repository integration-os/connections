### Update or Create Bank Transactions

Update or create bank transactions in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateBankTransactions)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "bankTransactions": {
    "bankTransactions": [
      {
        "type": "RECEIVE",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": [
          {
            "description": "Hello World",
            "quantity": 1,
            "unitAmount": 20.0,
            "accountCode": "000",
            "taxType": "NONE"
          }
        ]
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "bankTransactions": [
      {
        "type": "RECEIVE",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": [
          {
            "description": "Hello World",
            "quantity": 1,
            "unitAmount": 20.0,
            "accountCode": "000",
            "taxType": "NONE"
          }
        ]
      }
    ]
  }
}
```
