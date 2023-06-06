### Delete Contact Group Contacts

Delete all contacts from a contact group in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteContactGroupContacts)

**Sample Request**
```json
{
  "contactGroupID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "tenant1": {
    "contactGroup": {
      "contactGroupID": "00000000-0000-0000-0000-000000000000",
      "name": "Hello World",
      "status": "DELETED"
    }
  }
}
```
