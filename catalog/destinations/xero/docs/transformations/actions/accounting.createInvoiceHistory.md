### Create Invoice History

Create invoice history in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createInvoiceHistory)

**Sample Payload**

```json
{
  "invoiceID": "00000000-0000-0000-0000-000000000000",
  "historyRecords":  {
      "historyRecords": [
          {
            "type": "NOTE",
            "dateUtc": "2020-12-10T00:00:00.000Z",
            "note": "This is a note"
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
      "HistoryRecords": [
        {
          "type": "NOTE",
          "dateUtc": "2020-12-10T00:00:00.000Z",
          "note": "This is a note"
        }
      ]
    }
  ]
}
```
