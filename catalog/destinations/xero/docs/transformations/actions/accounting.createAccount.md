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
    "accounts": [
      {
        "code": "1234",
        "name": "My Account",
        "accountID": "614f6f15-6412-40ee-9a83-3d6219a1aba1",
        "type": "EXPENSE",
        "status": "ACTIVE",
        "description": "My Account Description",
        "taxType": "INPUT",
        "enablePaymentsToAccount": false,
        "showInExpenseClaims": false,
        "_class": "EXPENSE",
        "reportingCode": "EXP",
        "reportingCodeName": "Expense",
        "updatedDateUTC": "2023-05-14T10:25:12.693Z",
        "addToWatchlist": false
      }
    ]
}
```
