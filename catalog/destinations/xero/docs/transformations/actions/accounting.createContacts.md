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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "Contacts": [
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
  ]
}
```
