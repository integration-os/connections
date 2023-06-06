### Create Batch Payment

Create a batch payment in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankPayment)

**Sample Payload**

```json
{
  "batchPayments": [
    {
      "account": {
        "accountID": "00000000-0000-0000-0000-000000000000"
      },
      "reference": "hello foobar",
      "date": "2023-05-14T14:46:53.334Z",
      "payments": [
        {
          "account": {
            "accountID": "00000000-0000-0000-0000-000000000000"
          },
          "date": "2023-05-14T14:46:53.334Z",
          "amount": 1,
          "invoice": {
            "invoiceID": "00000000-0000-0000-0000-000000000000"
          }
        }
      ]
    }
  ]
}
```

**Sample Response**

```json
{
  "tenant1": {
    "BatchPayments": [
      {
        "account": {
          "accountID": "00000000-0000-0000-0000-000000000000"
        },
        "reference": "hello foobar",
        "date": "2023-05-14T14:46:53.334Z",
        "payments": [
          {
            "account": {
              "accountID": "00000000-0000-0000-0000-000000000000"
            },
            "date": "2023-05-14T14:46:53.334Z",
            "amount": 1,
            "invoice": {
              "invoiceID": "00000000-0000-0000-0000-000000000000"
            }
          }
        ]
      }
    ]
  }
}
```
