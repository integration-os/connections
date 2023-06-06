### Update or Create Items

Update or create items in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateItems)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "items": {
    "items": [
      {
        "code": "Hello World",
        "name": "Hello World",
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
        "itemID": "00000000-0000-0000-0000-000000000000",
        "code": "Hello World",
        "name": "Hello World",
        "status": "ACTIVE"
      }
    ]
  }
}
```
