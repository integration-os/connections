### Create Bank Transfer History Record

Create a new bank transfer history record in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankTransferHistoryRecord)


**Sample Payload**

```json
{
  "bankTransferID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "Hello World"
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
      "HistoryRecords": [
        {
          "historyRecordID": "00000000-0000-0000-0000-000000000000",
          "details": "Hello World",
          "createdDateUTC": "2020-01-01T00:00:00Z"
        }
      ]
    }
  ]
}
```
