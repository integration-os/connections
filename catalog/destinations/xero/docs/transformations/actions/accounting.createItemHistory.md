### Create Item History

Create item history in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createItemHistory)

**Sample Payload**

```json
{
  "itemID": "00000000-0000-0000-0000-000000000000",
  "historyRecords":  {
      "historyRecords": [
          {
            "type": "NOTE",
            "dateUtc": "2020-12-10T00:00:00.000Z",
            "note": "This is a note"
          }
        ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
      "historyRecords": [
        {
          "type": "NOTE",
          "dateUtc": "2020-12-10T00:00:00.000Z",
          "note": "This is a note"
        }
      ]
    }
}
```
