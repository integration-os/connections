### Create Manual Journals

Create manual journals in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createManualJournals)

**Sample Payload**

```json
{
  "summarizeErrors": true,
  "manualJournals": {
    "manualJournals": [
      {
        "date": "2020-12-10T00:00:00.000Z",
        "narration": "HelloWorld",
        "journalLines": [
          {
            "description": "Foobar",
            "accountCode": "140",
            "lineAmount": 100.0
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
  "tenant1": {
      "manualJournals": [
        {
          "date": "2020-12-10T00:00:00.000Z",
          "narration": "HelloWorld",
          "journalLines": [
            {
              "description": "Foobar",
              "accountCode": "140",
              "lineAmount": 100.0
            }
          ]
        }
      ]
    }
}
```
