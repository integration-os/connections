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
    "contacts": [
      {
        "contactID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
```
