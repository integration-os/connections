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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "Quotes": [
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

