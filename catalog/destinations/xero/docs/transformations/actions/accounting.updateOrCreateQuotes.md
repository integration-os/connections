### Update or Create Quotes

Update or create quotes in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateQuotes)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "quotes": {
    "quotes": [
      {
        "quoteNumber": "Hello World",
        "quoteID": "00000000-0000-0000-0000-000000000000"
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
          "quoteID": "00000000-0000-0000-0000-000000000000",
          "quoteNumber": "Hello World",
          "status": "DRAFT"
        }
      ]
    }
  ]
}
```
