### Create Invoices

Create one or more invoices in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createInvoices)

**Sample Request**

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
        "date": "2020-10-10",
        "dueDate": "2020-10-28",
        "lineItems": [
          {
            "description": "Foobar",
            "quantity": 1,
            "unitAmount": 20,
            "accountCode": "000",
            "tracking": [
              {
                "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
                "trackingOptionID": "00000000-0000-0000-0000-000000000000"
              }
            ]
          }
        ],
        "reference": "Website Design",
        "status": "DRAFT"
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
      "Invoices": [
        {
          "type": "ACCREC",
          "contact": {
            "contactID": "00000000-0000-0000-0000-000000000000"
          },
          "date": "2020-10-10",
          "dueDate": "2020-10-28",
          "lineItems": [
            {
              "description": "Foobar",
              "quantity": 1,
              "unitAmount": 20,
              "accountCode": "000",
              "tracking": [
                {
                  "trackingCategoryID": "00000000-0000-0000-0000-000000000000",
                  "trackingOptionID": "00000000-0000-0000-0000-000000000000"
                }
              ]
            }
          ],
          "reference": "Website Design",
          "status": "DRAFT"
        }
      ]
    }
  ]
}
```
