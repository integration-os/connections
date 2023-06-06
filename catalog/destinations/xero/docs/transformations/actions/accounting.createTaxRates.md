### Create Tax Rates

Create one or more tax rates.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createTaxRates)

**Sample Request**
```json
{
  "summarizeErrors": true,
  "taxRates": {
    "taxRates": [
      {
        "name": "Test Tax Rate",
        "taxType": "INPUT",
        "taxComponents": [
          {
            "name": "Test Tax Component",
            "rate": 2.25
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
  "tenant1": {
    "taxRates": [
      {
        "taxRateID": "00000000-0000-0000-0000-000000000000",
        "name": "Test Tax Rate",
        "taxType": "INPUT",
        "taxComponents": [
          {
            "name": "Test Tax Component",
            "rate": 2.25
          }
        ]
      }
    ]
  }
}
```
