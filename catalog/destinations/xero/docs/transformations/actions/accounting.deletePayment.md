### Delete Payment

Delete a payment in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deletePayment)

**Sample Request**
```json
{
  "paymentID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "responses": [
    {
      "payment": {
        "paymentID": "00000000-0000-0000-0000-000000000000",
        "type": "ACCRECPAYMENT",
        "date": "2021-05-18T10:25:49.793Z",
        "status": "DELETED",
        "amount": 0,
        "reference": "Hello World"
      }
    }
  ]
}
```
