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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "Payments": [
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
