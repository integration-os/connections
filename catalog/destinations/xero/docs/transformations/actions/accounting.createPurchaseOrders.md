### Create Purchase Orders

Creates one or more purchase orders.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createPurchaseOrders)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "purchaseOrders": {
    "purchaseOrders": [
      {
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000"
        },
        "lineItems": {
          "lineItems": [
            {
              "description": "HelloWorld",
              "quantity": 0,
              "unitAmount": 0,
              "accountCode": "00000000-0000-0000-0000-000000000000"
            }
          ]
        }
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
        "purchaseOrderNumber": "HelloWorld",
        "contact": {
          "contactID": "00000000-0000-0000-0000-000000000000",
          "name": "HelloWorld"
        },
        "date": "/Date(1684354973404)/",
        "deliveryDate": "/Date(1684354973404)/",
        "deliveryAddress": "HelloWorld",
        "attentionTo": "HelloWorld",
        "telephone": "HelloWorld",
        "deliveryInstructions": "HelloWorld",
        "brandingThemeID": "00000000-0000-0000-0000-000000000000",
        "currencyCode": "HelloWorld",
        "currencyRate": 0,
        "status": "HelloWorld",
        "lineAmountTypes": "HelloWorld",
        "subTotal": 0,
        "totalTax": 0,
        "total": 0,
        "totalDiscount": 0,
        "totalItems": 0,
        "updatedDateUTC": "/Date(1684354973404)/",
        "hasAttachments": true,
        "isDiscounted": true
      }
    ]
  }
}
```
