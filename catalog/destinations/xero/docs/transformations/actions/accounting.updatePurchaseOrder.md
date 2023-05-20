### Update Purchase Order

Update a purchase order in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updatePurchaseOrder)

**Sample Payload**
```json
{
  "purchaseOrderID": "00000000-0000-0000-0000-000000000000",
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
  "purchaseOrders": [
    {
      "purchaseOrderID": "00000000-0000-0000-0000-000000000000",
      "purchaseOrderNumber": "Hello World",
      "status": "DRAFT"
    }
  ]
}
```
