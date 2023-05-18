### Create Batch Payment

Create a batch payment in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankPayment)


**Sample Payload**
```json
{
  "summarizeErrors": true,
  "batchPayments": {
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
  ]
}
```
