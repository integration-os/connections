### Update Expense Claim

Update an expense claim in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateExpenseClaim)

**Sample Payload**
```json
{
  "expenseClaimID": "00000000-0000-0000-0000-000000000000",
  "expenseClaims": {
    "expenseClaims": [
      {
        "expenseClaimID": "00000000-0000-0000-0000-000000000000",
        "status": "SUBMITTED",
        "total": 0,
        "updatedDateUTC": "2021-05-18T10:25:49.793Z",
        "receipts": [
          {
            "receiptID": "00000000-0000-0000-0000-000000000000",
            "receiptNumber": "Hello World",
            "status": "SUBMITTED",
            "total": 0,
            "updatedDateUTC": "2021-05-18T10:25:49.793Z",
            "user": {
              "userID": "00000000-0000-0000-0000-000000000000",
              "firstName": "Hello World",
              "lastName": "Hello World"
            },
            "lineAmountTypes": "NoTax",
            "lineItems": [
              {
                "description": "Hello World",
                "quantity": 0,
                "unitAmount": 0,
                "accountCode": "000",
                "taxType": "NONE",
                "lineAmount": 0,
                "tracking": [
                  {
                    "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
                    "trackingOptionID": "00000000-0000-0000-0000-000000000000"
                  }
                ]
              }
            ]
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
      "expenseClaim": {
        "expenseClaimID": "00000000-0000-0000-0000-000000000000",
        "status": "SUBMITTED",
        "total": 0,
        "updatedDateUTC": "2021-05-18T10:25:49.793Z",
        "receipts": [
          {
            "receiptID": "00000000-0000-0000-0000-000000000000",
            "receiptNumber": "Hello World",
            "status": "SUBMITTED",
            "total": 0,
            "updatedDateUTC": "2021-05-18T10:25:49.793Z",
            "user": {
              "userID": "00000000-0000-0000-0000-000000000000",
              "firstName": "Hello World",
              "lastName": "Hello World"
            },
            "lineAmountTypes": "NoTax",
            "lineItems": [
              {
                "description": "Hello World",
                "quantity": 0,
                "unitAmount": 0,
                "accountCode": "000",
                "taxType": "NONE",
                "lineAmount": 0,
                "tracking": [
                  {
                    "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
                    "trackingOptionID": "00000000-0000-0000-0000-000000000000"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```
