### Create Items

Create items in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createItems)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "items": {
    "items": [
      {
        "code": "abcXYZ123",
        "name": "HelloWorld",
        "description": "Foobar",
        "inventoryAssetAccountCode": "140",
        "purchaseDetails": {
          "cOGSAccountCode": "500"
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
      "items": [
        {
          "code": "abcXYZ123",
          "name": "HelloWorld",
          "description": "Foobar",
          "inventoryAssetAccountCode": "140",
          "purchaseDetails": {
            "cOGSAccountCode": "500"
          }
        }
      ]
    }
}
```
