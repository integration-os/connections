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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
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
