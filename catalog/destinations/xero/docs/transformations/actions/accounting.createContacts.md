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
```
