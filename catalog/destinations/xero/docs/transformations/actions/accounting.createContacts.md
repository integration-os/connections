### Create Contacts

Create contacts in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createContacts)


**Sample Payload**

```json
{
  "summarizeErrors": true,
  "contacts": {
    "contacts": [
      {
        "name": "Bruce Banner",
        "emailAddress": "hulk@avengers.com",
        "phones": [
          {
            "phoneNumber": "555-1212",
            "phoneType": "MOBILE"
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
      "contacts": [
        {
          "contactID": "5b8ec4d3-c1ba-4ea3-b1e2-1e0d401ffca0",
          "contactStatus": "ACTIVE",
          "name": "The Incredible Hulk",
          "firstName": "Bruce",
          "lastName": "Banner",
          "emailAddress": "",
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
              "phoneNumber": "",
              "phoneAreaCode": "",
              "phoneCountryCode": ""
            }
          ],
          "isSupplier": false,
          "isCustomer": false,
          "salesTrackingCategories": [],
          "purchasesTrackingCategories": [],
          "updatedDateUTC": "2023-05-20T16:44:23.793Z",
          "contactGroups": [],
          "hasValidationErrors": false
        }
      ]
    }
  ]
}
```
