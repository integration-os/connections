### Create Contact Group Contacts

Create contacts in a contact group in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createContactGroupContacts)

**Sample Payload**

```json
{
  "contactGroupID": "00000000-0000-0000-0000-000000000000",
  "contacts": {
    "contacts": [
      {
        "contactID": "00000000-0000-0000-0000-000000000000"
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
          "contactID": "00000000-0000-0000-0000-000000000000"
        }
      ]
    }
  ]
}
```
