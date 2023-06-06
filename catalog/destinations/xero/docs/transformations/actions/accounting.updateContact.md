### Update Contact

Update a contact in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateContact)

**Sample Payload**
```json
{
  "contactID": "00000000-0000-0000-0000-000000000000",
  "contacts": {
    "contacts": [
      {
        "name": "Hello World",
        "contactID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "contacts": [
      {
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
        "isSupplier": false,
        "isCustomer": false,
        "salesTrackingCategories": [],
        "purchasesTrackingCategories": [],
        "updatedDateUTC": "2023-05-20T16:40:24.110Z",
        "contactGroups": [],
        "hasValidationErrors": false
      }
    ]
  }
}
```
