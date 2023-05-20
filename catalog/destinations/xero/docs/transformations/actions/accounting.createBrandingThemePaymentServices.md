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
      "paymentServices": [
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
