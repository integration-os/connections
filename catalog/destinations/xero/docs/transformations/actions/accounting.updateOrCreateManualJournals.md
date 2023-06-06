### Update or Create Manual Journals

Update or create manual journals in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateManualJournals)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "manualJournals": {
    "manualJournals": [
      {
        "narration": "Hello World",
        "manualJournalID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "manualJournals": [
      {
        "manualJournalID": "00000000-0000-0000-0000-000000000000",
        "narration": "Hello World",
        "status": "DRAFT"
      }
    ]
  }
}
```
