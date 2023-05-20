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
      "creditNotes": [
        {
          "type": "ACCRECCREDIT",
          "contact": {
            "contactID": "8cfad7d0-2d02-49dc-97ef-b39d874290e5",
            "contactStatus": "ACTIVE",
            "name": "The Hulk",
            "firstName": "Bruce",
            "lastName": "Banner",
            "emailAddress": "hulk@avengersz.com",
            "contactPersons": [],
            "bankAccountDetails": "",
            "addresses": [
              {
                "addressType": "STREET",
                "city": "",
                "region": "",
                "postalCode": "",
                "country": ""
              },
              {
                "addressType": "POBOX",
                "city": "",
                "region": "",
                "postalCode": "",
                "country": ""
              }
            ],
            "phones": [
              {
                "phoneType": "DEFAULT",
                "phoneNumber": "",
                "phoneAreaCode": "",
                "phoneCountryCode": ""
              },
              {
                "phoneType": "DDI",
                "phoneNumber": "",
                "phoneAreaCode": "",
                "phoneCountryCode": ""
              },
              {
                "phoneType": "FAX",
                "phoneNumber": "",
                "phoneAreaCode": "",
                "phoneCountryCode": ""
              },
              {
                "phoneType": "MOBILE",
                "phoneNumber": "555-21211",
                "phoneAreaCode": "",
                "phoneCountryCode": ""
              }
            ],
            "updatedDateUTC": "2023-05-20T16:40:24.110Z",
            "contactGroups": [],
            "hasValidationErrors": false
          },
          "date": "2023-05-20T00:00:00.000Z",
          "status": "DRAFT",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "lineItemID": "476173ab-9b3c-4a9e-bd7b-0d1000e42898",
              "description": "Foobar",
              "tracking": []
            }
          ],
          "subTotal": 0,
          "totalTax": 0,
          "total": 0,
          "updatedDateUTC": "2023-05-20T16:57:04.943Z",
          "currencyCode": "USD",
          "creditNoteID": "ac7bc6e3-f656-4b96-b742-60bf46e0a40d",
          "creditNoteNumber": "CN-0031",
          "reference": "",
          "currencyRate": 1,
          "remainingCredit": 0,
          "allocations": [],
          "payments": [],
          "brandingThemeID": "d613f7f9-8fcb-477f-97f0-31eb85b7e5cf",
          "hasErrors": false
        }
      ]
    }
  ]
}
```
