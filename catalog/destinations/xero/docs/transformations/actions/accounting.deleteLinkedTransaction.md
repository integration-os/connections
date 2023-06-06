### Delete Linked Transaction

Delete a linked transaction in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteLinkedTransaction)

**Sample Request**
```json
{
  "linkedTransactionID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "tenant1": {
    "linkedTransaction": {
      "linkedTransactionID": "00000000-0000-0000-0000-000000000000",
      "sourceTransactionID": "00000000-0000-0000-0000-000000000000",
      "sourceLineItemID": "00000000-0000-0000-0000-000000000000",
      "contactID": "00000000-0000-0000-0000-000000000000",
      "targetTransactionID": "00000000-0000-0000-0000-000000000000",
      "targetLineItemID": "00000000-0000-0000-0000-000000000000",
      "status": "DELETED",
      "type": "ACCREC",
      "updatedDateUTC": "2021-05-18T10:25:49.793Z",
      "currencyRate": 0,
      "currencyRateType": "Average",
      "hasErrors": false,
      "isLinked": false
    }
  }
}
```
