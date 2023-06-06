### Update Linked Transaction

Update a linked transaction in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateLinkedTransaction)

**Sample Payload**
```json
{
  "linkedTransactionID": "00000000-0000-0000-0000-000000000000",
  "linkedTransactions": {
    "linkedTransactions": [
      {
        "sourceTransactionID": "00000000-0000-0000-0000-000000000000",
        "sourceLineItemID": "00000000-0000-0000-0000-000000000000",
        "contactID": "00000000-0000-0000-0000-000000000000",
        "targetTransactionID": "00000000-0000-0000-0000-000000000000",
        "targetLineItemID": "00000000-0000-0000-0000-000000000000",
        "status": "ACTIVE",
        "type": "ACCPAY"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "linkedTransactions": [
      {
        "linkedTransactionID": "00000000-0000-0000-0000-000000000000",
        "sourceTransactionID": "00000000-0000-0000-0000-000000000000",
        "sourceLineItemID": "00000000-0000-0000-0000-000000000000",
        "contactID": "00000000-0000-0000-0000-000000000000",
        "targetTransactionID": "00000000-0000-0000-0000-000000000000",
        "targetLineItemID": "00000000-0000-0000-0000-000000000000",
        "status": "ACTIVE",
        "type": "ACCPAY"
      }
    ]
  }
}
```
