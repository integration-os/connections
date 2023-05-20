### Update Invoices

Update invoices in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateInvoice)

**Sample Payload**
```json
{
  "invoiceID": "00000000-0000-0000-0000-000000000000",
  "unitdp": 4,
  "invoices": {
    "invoices": [
      {
        "type": "ACCREC",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "date": "2021-05-18T10:25:49.793Z",
        "dueDate": "2021-05-18T10:25:49.793Z",
        "lineAmountTypes": "Exclusive",
        "lineItems": [
          {
            "description": "Hello World",
            "quantity": 0,
            "unitAmount": 0,
            "accountCode": "000",
            "taxType": "NONE"
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
      "invoices": [
        {
          "type": "ACCREC",
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000",
            "name": "Hello World"
          },
          "date": "2021-05-18T10:25:49.793Z",
          "dueDate": "2021-05-18T10:25:49.793Z",
          "status": "DRAFT",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "description": "Hello World",
              "quantity": 0.0,
              "unitAmount": 0.0,
              "taxType": "NONE",
              "taxAmount": 0.0,
              "lineAmount": 0.0,
              "accountCode": "000",
              "lineItemID": "00000000-0000-0000-0000-000000000000"
            }
          ],
          "invoiceID": "00000000-0000-0000-0000-000000000000"
        }
      ]
    }
  ]
}
```

