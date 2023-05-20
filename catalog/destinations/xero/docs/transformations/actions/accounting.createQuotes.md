### Create Quotes

Creates one or more quotes.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createQuotes)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "quotes": {
    "quotes": [
      {
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": [
            {
              "description": "HelloWorld",
              "quantity": 0,
              "unitAmount": 0,
              "accountCode": "00000000-0000-0000-0000-000000000000"
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
      "quotes": [
        {
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000"
          },
          "lineItems": [
            {
              "description": "HelloWorld",
              "quantity": 0,
              "unitAmount": 0,
              "accountCode": "00000000-0000-0000-0000-000000000000"
            }
          ]
        }
      ]
    }
  ]
}
```

