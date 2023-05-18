### Delete Account

Delete an account in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteAccount)

```json
{
  "accountID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "responses": [
    {
      "accounts": [
        {
          "code": "123456",
          "name": "FooBar",
          "accountID": "9d646b58-09db-4029-b1c3-4d79ff9ebcd8",
          "type": "EXPENSE",
          "status": "DELETED",
          "description": "Hello World",
          "taxType": "INPUT",
          "enablePaymentsToAccount": false,
          "showInExpenseClaims": false,
          "_class": "EXPENSE",
          "reportingCode": "EXP",
          "reportingCodeName": "Expense",
          "updatedDateUTC": "2023-05-18T10:25:49.793Z",
          "addToWatchlist": false
        }
      ]
    }
  ]
}
```
