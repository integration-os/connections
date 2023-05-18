# Create Branding Theme Payment Services

Create a branding theme payment services in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBrandingThemePaymentServices)

**Sample Payload**
```json
{
  "brandingThemeID": "00000000-0000-0000-0000-000000000000",
  "paymentServices": {
    "paymentServices": [
      {
        "paymentServiceID": "00000000-0000-0000-0000-000000000000",
        "paymentServiceName": "ACME Payments",
        "paymentServiceUrl": "https://www.payupnow.com/",
        "payNowText": "Pay Now"
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
      "PaymentServices": [
        {
          "paymentServiceID": "00000000-0000-0000-0000-000000000000",
          "paymentServiceName": "ACME Payments",
          "paymentServiceUrl": "https://www.payupnow.com/",
          "payNowText": "Pay Now"
        }
      ]
    }
  ]
}
```
