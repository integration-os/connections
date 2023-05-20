### Update Tax Rate

Update a tax rate in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateTaxRate)

**Sample Payload**
```json
{
  "taxRates": {
    "taxRates": [
        {
            "name": "Hello World",
            "taxRateID": "00000000-0000-0000-0000-000000000000"
        }
    ]
  }
}
```

**Sample Response**
```json
{
  "taxRates": [
    {
      "taxRateID": "00000000-0000-0000-0000-000000000000",
      "name": "Hello World",
      "status": "ACTIVE"
    }
  ]
}
```
