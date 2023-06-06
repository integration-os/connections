### Update or Create Purchase Orders

Update or create purchase orders in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreatePurchaseOrders)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "purchaseOrders": {
    "purchaseOrders": [
      {
        "purchaseOrderNumber": "Hello World",
        "purchaseOrderID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "purchaseOrders": [
      {
        "purchaseOrderID": "00000000-0000-0000-0000-000000000000",
        "purchaseOrderNumber": "Hello World",
        "status": "DRAFT"
      }
    ]
  }
}
```
