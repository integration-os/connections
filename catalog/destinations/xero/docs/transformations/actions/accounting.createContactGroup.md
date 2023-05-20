### Create Contact Group

Create a new contact group in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createContactGroup)


**Sample Request**

```json
{
  "contactGroups": {
    "contactGroups": [
      {
        "name": "VIPs"
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
          "name": "VIPs",
          "status": "ACTIVE",
          "createdDateUTC": "2020-01-01T00:00:00Z",
          "updatedDateUTC": "2020-01-01T00:00:00Z"
        }
      ]
    }
  ]
}
```
