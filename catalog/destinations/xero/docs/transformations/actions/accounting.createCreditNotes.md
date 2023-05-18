### Create Credit Notes

Create credit notes in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createCreditNotes)


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
        "date": "2020-12-10",
        "lineItems": [
          {
            "description": "Foobar",
            "quantity": 1,
            "unitAmount": 20,
            "accountCode": "000"
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
      "CreditNotes": [
        {
          "type": "ACCPAYCREDIT",
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000"
          },
          "date": "2020-12-10",
          "lineItems": [
            {
              "description": "Foobar",
              "quantity": 1,
              "unitAmount": 20,
              "accountCode": "000"
            }
          ]
        }
      ]
    }
  ]
}
```
