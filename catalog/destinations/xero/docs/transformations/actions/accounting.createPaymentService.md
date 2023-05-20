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
      "paymentServices": [
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
