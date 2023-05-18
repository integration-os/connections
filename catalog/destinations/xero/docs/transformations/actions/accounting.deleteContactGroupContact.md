### Delete Contact Group Contact

Delete contacts from a contact group in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteContactGroupContact)

**Sample Request**
```json
{
  "contactGroupID": "00000000-0000-0000-0000-000000000000",
  "contactID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "responses": [
    {
      "contactGroup": {
        "contactGroupID": "00000000-0000-0000-0000-000000000000",
        "name": "Hello World",
        "contacts": [
          {
            "contactID": "00000000-0000-0000-0000-000000000000"
          }
        ]
      }
    }
  ]
}
```

