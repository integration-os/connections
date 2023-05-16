### Create Bank Transaction History Record

Create a new bank transaction history record in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankTransactionHistoryRecord)

**Sample Payload**

```json
{
  "bankTransactionID": "614f6f15-6412-40ee-9a83-3d6219a1aba1",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "Received through the Xero API from ABC Org",
        "changes": "Approved"
      },
      {
        "details": "INV-0041 to ABC Furniture for 100.00.",
        "changes": "Edited"
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
      "details": "Hello World",
      "dateUTC": "2023-05-14T13:56:34.509Z"
    }
  ]
}
```
