### Create Currency

Create currencies in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createCurrency)


**Sample Payload**

```json
{
  "currency": {
    "code": "USD",
    "description": "United States Dollar",
    "decimalPlaces": 2,
    "active": true,
    "default": true
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
      "Currency": {
        "code": "USD",
        "description": "United States Dollar",
        "decimalPlaces": 2,
        "active": true,
        "default": true
      }
    }
  ]
}
```


