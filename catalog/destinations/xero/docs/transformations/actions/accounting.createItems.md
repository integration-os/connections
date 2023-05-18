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
    "responses": [
        {
        "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
        "Status": "OK",
        "ProviderName": "Event Test App",
        "DateTimeUTC": "/Date(1684354973404)/",
        "Items": [
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
    ]
}
```
