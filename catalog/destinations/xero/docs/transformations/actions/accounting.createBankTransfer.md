### Create Bank Transfer

Create a new bank transfer in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankTransfer)


**Sample Payload**

```json
{
  "bankTransfers": [
    {
      "fromBankAccount": {
        "accountID": "00000000-0000-0000-0000-000000000000"
      },
      "toBankAccount": {
        "accountID": "00000000-0000-0000-0000-000000000000"
      },
      "amount": 1
    }
  ]
}
```

**Sample Response**

```json
{
  "responses": [
    {
      "bankTransfers": [
        {
          "bankTransferID": "00000000-0000-0000-0000-000000000000",
          "fromBankAccount": {
            "accountID": "00000000-0000-0000-0000-000000000000"
          },
          "toBankAccount": {
            "accountID": "00000000-0000-0000-0000-000000000000"
          },
          "amount": 1,
          "date": "2020-01-01T00:00:00Z",
          "status": "AUTHORISED",
          "hasAttachments": false
        }
      ]
    }
  ]
}
```
