### Create Manual Journal History Record

Create manual journal history record in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createManualJournalHistoryRecord)

**Sample Payload**

```json
{
  "manualJournalID": "00000000-0000-0000-0000-000000000000",
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
  "responses": [
    {
      "historyRecords": [
        {
          "type": "NOTE",
          "dateUtc": "2020-12-10T00:00:00.000Z",
          "note": "This is a note"
        }
      ]
    }
  ]
}
```
