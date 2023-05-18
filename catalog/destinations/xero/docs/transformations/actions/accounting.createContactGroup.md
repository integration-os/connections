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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "ContactGroups": [
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
