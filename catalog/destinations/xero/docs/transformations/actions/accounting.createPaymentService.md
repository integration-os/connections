### Create Payment Service

Create a payment service in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPaymentService)

**Sample Payload**
```json
{
  "paymentServices": {
    "paymentServices": [
      {
        "paymentServiceName": "HelloWorld",
        "paymentServiceUrl": "https://example.com",
        "payNowText": "Pay Now",
        "paymentServiceType": "Custom"
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
          "paymentServiceName": "HelloWorld",
          "paymentServiceUrl": "https://example.com",
          "payNowText": "Pay Now",
          "paymentServiceType": "Custom"
        }
      ]
    }
  ]
}
```
