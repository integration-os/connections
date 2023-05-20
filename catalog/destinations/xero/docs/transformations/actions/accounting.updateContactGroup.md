### Update Contact Group

Update a contact group in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateContactGroup)

**Sample Payload**
```json
{
  "contactGroupID": "00000000-0000-0000-0000-000000000000",
  "contactGroups": {
    "contactGroups": [
      {
        "name": "Hello World",
        "contactGroupID": "00000000-0000-0000-0000-000000000000"
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
      "contactGroups": [
        {
          "contactGroupID": "00000000-0000-0000-0000-000000000000",
          "name": "Hello World",
          "status": "ACTIVE"
        }
      ]
    }
  ]
}
```
