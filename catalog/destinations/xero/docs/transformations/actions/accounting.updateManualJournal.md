### Update Manual Journal

Update a manual journal in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateManualJournal)

**Sample Payload**
```json
{
  "manualJournalID": "00000000-0000-0000-0000-000000000000",
  "manualJournals": {
    "manualJournals": [
      {
        "narration": "Hello World",
        "manualJournalID": "00000000-0000-0000-0000-000000000000",
        "status": "DRAFT",
        "journalLines": [
          {
            "description": "Hello World",
            "accountID": "00000000-0000-0000-0000-000000000000",
            "lineAmount": 0
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
  "responses": [
    {
      "manualJournals": [
        {
          "manualJournalID": "00000000-0000-0000-0000-000000000000",
          "narration": "Hello World",
          "status": "DRAFT",
          "journalLines": [
            {
              "description": "Hello World",
              "accountID": "00000000-0000-0000-0000-000000000000",
              "lineAmount": 0.0
            }
          ]
        }
      ]
    }
  ]
}
```
