### Create Credit Note History

Create credit note history in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createCreditNotehistory)


**Sample Payload**

```json
{
  "creditNoteID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "Credit Note History Details",
        "dateUtc": "2020-12-10T00:00:00Z"
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
          "details": "Credit Note History Details",
          "dateUtc": "2020-12-10T00:00:00Z"
        }
      ]
    }
  ]
}
```
