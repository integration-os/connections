### Create Expense Claim History

Create expense claim history in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createExpenseClaimHistory)

**Sample Payload**
```json
{
  "expenseClaimID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": [
    {
      "dateUtcString": "2020-12-10T00:00:00.000Z",
      "details": "Foobar"
    }
  ]
}
```

**Sample Response**

```json
{
  "historyRecords": [
    {
      "dateUtcString": "2020-12-10T00:00:00.000Z",
      "details": "Foobar"
    }
  ]
}
```
