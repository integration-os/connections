### Update or Create Contacts

Update or create contacts in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateContacts)

**Sample Payload**
```json
{
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
  "responses": [
    {
      "contacts": [
        {
          "contactID": "00000000-0000-0000-0000-000000000000",
          "name": "Hello World",
          "status": "ACTIVE"
        }
      ]
    }
  ]
}
```
