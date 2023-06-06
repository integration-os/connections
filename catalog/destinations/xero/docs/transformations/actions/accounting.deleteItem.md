### Delete Item

Delete an item in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-deleteItem)

**Sample Request**
```json
{
  "itemID": "00000000-0000-0000-0000-000000000000"
}
```

**Sample Response**
```json
{
  "tenant1": {
    "item": {
      "itemID": "00000000-0000-0000-0000-000000000000",
      "code": "Hello World",
      "name": "Hello World",
      "status": "DELETED",
      "isSold": true,
      "isPurchased": true,
      "description": "Hello World",
      "purchaseDescription": "Hello World",
      "purchaseDetails": {
        "unitPrice": 0,
        "accountCode": "000",
        "cOGSAccountCode": "000"
      },
      "salesDetails": {
        "unitPrice": 0,
        "accountCode": "000",
        "taxType": "NONE"
      },
      "isTrackedAsInventory": true,
      "totalCostPool": 0,
      "quantityOnHand": 0,
      "updatedDateUTC": "2021-05-18T10:25:49.793Z",
      "validationErrors": [
        {
          "message": "Hello World",
          "code": "Hello World"
        }
      ]
    }
  }
}
```
