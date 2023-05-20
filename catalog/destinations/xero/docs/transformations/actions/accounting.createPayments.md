### Create Payments

Creates one or more payments for invoices or credit notes.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPayments)

**Sample Payload**
```json
{
  "payments": {
    "payments": [
      {
        "invoice": {
          "invoiceID": "00000000-0000-0000-0000-000000000000"
        },
        "account": {
          "accountID": "00000000-0000-0000-0000-000000000000"
        },
        "date": "2020-12-10T00:00:00.000Z",
        "amount": 0,
        "reference": "HelloWorld",
        "isReconciled": true,
        "status": "AUTHORISED",
        "paymentType": "ACCRECPAYMENT"
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
      "payments": [
        {
          "invoice": {
            "invoiceID": "00000000-0000-0000-0000-000000000000"
          },
          "account": {
            "accountID": "00000000-0000-0000-0000-000000000000"
          },
          "date": "2020-12-10T00:00:00.000Z",
          "amount": 0,
          "reference": "HelloWorld",
          "isReconciled": true,
          "status": "AUTHORISED",
          "paymentType": "ACCRECPAYMENT"
        }
      ]
    }
  ]
}
```
