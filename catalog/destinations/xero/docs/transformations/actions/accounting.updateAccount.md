### Update Account

Update an account in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateAccount)

**Sample Payload**
```json
{
  "responses": [
    {
      "accountID": "00000000-0000-0000-0000-000000000000",
      "accounts": {
        "accounts": [
          {
            "code": "123456",
            "name": "BarFoo",
            "type": "EXPENSE",
            "description": "Hello World",
            "taxType": "NONE"
          }
        ]
      }
    }
  ]
}
```

**Sample Response**
```json
{
  "responses": [
    {
      "accounts": [
        {
          "accountID": "00000000-0000-0000-0000-000000000000",
          "code": "123456",
          "name": "BarFoo",
          "type": "EXPENSE",
          "taxType": "NONE",
          "description": "Hello World",
          "enablePaymentsToAccount": true,
          "showInExpenseClaims": true,
          "status": "ACTIVE",
          "bankAccountNumber": "123456789",
          "bankAccountType": "BANK",
          "currencyCode": "USD",
          "reportingCode": "123",
          "reportingCodeName": "Hello World",
          "hasAttachments": true,
          "updatedDateUTC": "2020-01-01T00:00:00.000Z",
          "createdDateUTC": "2020-01-01T00:00:00.000Z",
          "class": {
            "classID": "00000000-0000-0000-0000-000000000000",
            "className": "Hello World"
          },
          "systemAccount": {
            "systemAccountID": "00000000-0000-0000-0000-000000000000",
            "systemAccountName": "Hello World"
          }
        }
      ]
    }
  ]
}
```
