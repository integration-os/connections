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
  "responses": [
    {
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "ManualJournals": [
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
  ]
}
```
