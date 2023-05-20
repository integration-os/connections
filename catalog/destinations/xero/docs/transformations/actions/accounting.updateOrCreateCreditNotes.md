### Update or Create Credit Notes

Update or create credit notes in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateCreditNotes)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "creditNotes": {
    "creditNotes": [
      {
        "type": "ACCPAYCREDIT",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "date": "2020-01-01",
        "lineAmountTypes": "Exclusive",
        "lineItems": [
          {
            "description": "Hello World",
            "quantity": 1,
            "unitAmount": 20.0,
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
      "creditNotes": [
        {
          "type": "ACCPAYCREDIT",
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000",
            "name": "Hello World"
          },
          "date": "2020-01-01T00:00:00",
          "status": "DRAFT",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "description": "Hello World",
              "quantity": 1.0,
              "unitAmount": 20.0,
              "taxType": "NONE",
              "taxAmount": 0.0,
              "lineAmount": 20.0,
              "accountCode": "000",
              "lineItemID": "00000000-0000-0000-0000-000000000000"
            }
          ],
          "subTotal": 20.0,
          "totalTax": 0.0,
          "total": 20.0,
          "creditNoteID": "00000000-0000-0000-0000-000000000000",
          "updatedDateUTC": "2020-01-01T00:00:00",
          "currencyCode": "NZD",
          "fullyPaidOnDate": "2020-01-01T00:00:00",
          "creditNoteNumber": "00000000",
          "reference": "Hello World",
          "currencyRate": 1.0,
          "remainingCredit": 20.0,
          "hasAttachments": false,
          "hasErrors": false
        }
      ]
    }
  ]
}
```
