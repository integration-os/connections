### Create Account

Create a new account in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createAccount)

**Sample Payload**

```json
{
  "account": {
    "name": "My Account",
    "code": "123",
    "type": "EXPENSE",
    "description": "My Account Description"
  }
}
```

**Sample Response**

```json
{
  "tenant1": {
    "accounts": [
      {
        "code": "123",
        "name": "My Account",
        "accountID": "44a3a0eb-7247-45f5-b523-e9860be94194",
        "type": "EXPENSE",
        "status": "ACTIVE",
        "taxType": "NONE",
        "enablePaymentsToAccount": false,
        "showInExpenseClaims": false,
        "_class": "LIABILITY",
        "reportingCode": "LIA",
        "reportingCodeName": "Liabilities",
        "updatedDateUTC": "2023-05-20T16:48:43.657Z",
        "addToWatchlist": false
      }
    ]
  }
}
```
