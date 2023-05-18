### Create Batch Payment History Record

Create a batch payment history record in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBatchPaymentHistoryRecord)


**Sample Payload**
```json
{
  "batchPaymentID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "hello foobar",
        "dateUTC": "2023-05-14T14:46:53.334Z"
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
          "details": "hello foobar",
          "createdDateUTC": "2020-01-01T00:00:00Z"
        }
      ]
    }
  ]
}
```


