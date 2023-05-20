### Update or Create Invoices

Update or create invoices in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateInvoices)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "invoices": {
    "invoices": [
      {
        "type": "ACCREC",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "date": "2020-01-01",
        "dueDate": "2020-01-01",
        "lineAmountTypes": "Exclusive",
        "lineItems": [
          {
            "description": "Hello World",
            "quantity": 1,
            "unitAmount": 100,
            "accountCode": "00000000-0000-0000-0000-000000000000"
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
          "date": "2020-01-01T00:00:00",
          "dueDate": "2020-01-01T00:00:00",
          "status": "DRAFT",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "description": "Hello World",
              "quantity": 1.0,
              "unitAmount": 100.0,
              "taxType": "NONE",
              "taxAmount": 0.0,
              "lineAmount": 100.0,
              "accountCode": "00000000-0000-0000-0000-000000000000",
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
