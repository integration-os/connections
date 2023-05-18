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
  "responses": [
    {
      "Id": "81c42c86-d800-4464-8047-a94eadeb45fe",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684355776816)/",
      "HistoryRecords": [
        {
          "Changes": "Approved",
          "DateUTCString": "2023-05-17T20:36:16",
          "DateUTC": "/Date(1684355776816)/",
          "Details": "Received through the Xero API from ABC Org",
          "ValidationErrors": []
        },
        {
          "Changes": "Edited",
          "DateUTCString": "2023-05-17T20:36:16",
          "DateUTC": "/Date(1684355776816)/",
          "Details": "INV-0041 to ABC Furniture for 100.00.",
          "ValidationErrors": []
        }
      ]
    }
  ]
}
```
