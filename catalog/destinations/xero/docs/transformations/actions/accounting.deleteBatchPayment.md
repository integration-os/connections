### Delete Batch Payment

Delete a batch payment in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteBatchPayment)

**Sample Request**
```json
{
  "batchPaymentID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Request**
```json
{
  "responses": [
    {
      "batchPayment": {
        "batchPaymentID": "00000000-0000-0000-0000-000000000000",
        "type": "ACCRECPAYMENT",
        "date": "2021-05-18T10:25:49.793Z",
        "status": "DELETED",
        "totalAmount": 0,
        "totalAmountPaid": 0,
        "totalAmountDue": 0,
        "reference": "Hello World"
      }
    }
  ]
}
```



