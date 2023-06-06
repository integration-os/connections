### Create Contact History

Create a new contact history record in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createContactHistory)


**Sample Payload**

```json
{
  "contactID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "Contacted via phone",
        "date": "2020-01-01T00:00:00Z"
      }
    ]
  }
}
```

**Sample Response**

```json
{
  "tenant1": {
    "historyRecords": [
      {
        "details": "Contacted via phone",
        "date": "2020-01-01T00:00:00Z"
      }
    ]
  }
}
```

