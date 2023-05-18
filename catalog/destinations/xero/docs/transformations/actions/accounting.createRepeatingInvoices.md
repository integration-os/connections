### Create Repeating Invoices

Create one or more repeating invoices.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createRepeatingInvoices)

**Sample Request**
```json
{
  "summarizeErrors": true,
  "repeatingInvoices": {
    "repeatingInvoices": [
      {
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "type": "ACCREC",
        "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000",
        "total": 1000,
        "reference": "Test Reference",
        "status": "AUTHORISED"
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
      "RepeatingInvoices": [
        {
          "repeatingInvoiceID": "00000000-0000-0000-0000-000000000000",
          "type": "ACCREC",
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000"
          },
          "date": "/Date(1684354973404)/",
          "dueDate": "/Date(1684354973404)/",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "description": "Test Description",
              "quantity": 1,
              "unitAmount": 1000,
              "accountCode": "000",
              "taxType": "NONE"
            }
          ],
          "total": 1000
        }
      ]
    }
  ]
}
```
