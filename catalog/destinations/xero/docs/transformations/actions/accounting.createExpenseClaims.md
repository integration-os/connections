### Create Expense Claims

Create expense claims in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createExpenseClaims)

**Sample Payload**

```json
{
  "expenseClaims":  {
    "expenseClaims": [
      {
        "status": "SUBMITTED",
        "user": {
          "userID": "00000000-0000-0000-0000-000000000000"
        },
        "receipts": [
          {
            "receiptID": "00000000-0000-0000-0000-000000000000",
            "date": "2020-12-10"
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
  "responses": [
    {
      "expenseClaims": [
        {
          "status": "SUBMITTED",
          "user": {
            "userID": "00000000-0000-0000-0000-000000000000"
          },
          "receipts": [
            {
              "receiptID": "00000000-0000-0000-0000-000000000000",
              "date": "2020-12-10"
            }
          ]
        }
      ]
    }
  ]
}
```
