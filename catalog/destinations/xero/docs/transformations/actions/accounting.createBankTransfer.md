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
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "BankTransfers": [
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
