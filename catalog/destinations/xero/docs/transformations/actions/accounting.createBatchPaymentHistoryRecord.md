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
    "historyRecords": [
      {
        "details": "hello foobar",
        "dateUTC": "2023-05-14T14:46:53.334Z"
      }
    ]
  }
```


