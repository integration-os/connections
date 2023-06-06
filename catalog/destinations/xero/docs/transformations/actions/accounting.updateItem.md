### Update Item

Update items in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateItem)

**Sample Payload**
```json
{
  "itemsID": "00000000-0000-0000-0000-000000000000",
  "unitdp": 4,
  "items": {
    "items": [
      {
        "code": "Hello World",
        "name": "Hello World",
        "description": "Hello World",
        "isSold": true,
        "isPurchased": true,
        "inventoryAssetAccountCode": "Hello World",
        "salesDetails": {
          "unitPrice": 0,
          "accountCode": "Hello World"
        },
        "purchaseDetails": {
          "unitPrice": 0,
          "accountCode": "Hello World"
        },
        "itemID": "00000000-0000-0000-0000-000000000000"
      }
    ]
  }
}
```

**Sample Response**
```json
{
  "tenant1": {
    "items": [
      {
        "code": "Hello World",
        "name": "Hello World",
        "description": "Hello World",
        "isSold": true,
        "isPurchased": true,
        "inventoryAssetAccountCode": "Hello World",
        "salesDetails": {
          "unitPrice": 0.0,
          "accountCode": "Hello World"
        },
        "purchaseDetails": {
          "unitPrice": 0.0,
          "accountCode": "Hello World"
        },
        "itemID": "00000000-0000-0000-0000-000000000000",
        "status": "ACTIVE"
      }
    ]
  }
}
```
