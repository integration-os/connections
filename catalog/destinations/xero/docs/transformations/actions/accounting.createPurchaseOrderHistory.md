### Create Purchase Order History

Creates a history record for a purchase order.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPurchaseOrderHistory)

**Sample Payload**
```json
{
  "purchaseOrderID": "00000000-0000-0000-0000-000000000000",
  "historyRecords": {
    "historyRecords": [
      {
        "details": "HelloWorld"
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
        "details": "HelloWorld"
      }
    ]
  }
}
```
