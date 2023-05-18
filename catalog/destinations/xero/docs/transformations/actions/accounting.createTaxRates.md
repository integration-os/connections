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
  "responses": [
    {
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "TaxRates": [
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
  ]
}
```
