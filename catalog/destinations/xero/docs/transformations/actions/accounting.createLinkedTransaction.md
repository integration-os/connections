### Create Linked Transaction

Create a new linked transaction in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createLinkedTransaction)

**Sample Payload**
```json
{
  "linkedTransaction": {
    "sourceTransactionID": "00000000-0000-0000-0000-000000000000",
    "sourceLineItemID": "00000000-0000-0000-0000-000000000000",
    "contactID": "00000000-0000-0000-0000-000000000000",
    "targetTransactionID": "00000000-0000-0000-0000-000000000000",
    "targetLineItemID": "00000000-0000-0000-0000-000000000000",
    "status": "DRAFT",
    "type": "ACCPAY",
    "amount": 0,
    "date": "2020-12-10T00:00:00.000Z",
    "currencyRate": 0,
    "currencyCode": "USD",
    "description": "Foobar",
    "reference": "Foobar",
    "updatedDateUTC": "2020-12-10T00:00:00.000Z"
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
      "LinkedTransactions": [
        {
          "sourceTransactionID": "00000000-0000-0000-0000-000000000000",
          "sourceLineItemID": "00000000-0000-0000-0000-000000000000",
          "contactID": "00000000-0000-0000-0000-000000000000",
          "targetTransactionID": "00000000-0000-0000-0000-000000000000",
          "targetLineItemID": "00000000-0000-0000-0000-000000000000",
          "status": "DRAFT",
          "type": "ACCPAY",
          "amount": 0,
          "date": "2020-12-10T00:00:00.000Z",
          "currencyRate": 0,
          "currencyCode": "USD",
          "description": "Foobar",
          "reference": "Foobar",
          "updatedDateUTC": "2020-12-10T00:00:00.000Z"
        }
      ]
    }
  ]
}
```
