### Create Overpayment Allocations

Creates one or more overpayment allocations for a specified overpayment.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createOverpaymentAllocations)


**Sample Payload**
```json
{
  "overpaymentID": "00000000-0000-0000-0000-000000000000",
  "summarizeErrors": true,
  "allocations": {
    "allocations": [
      {
        "amount": 100.0,
        "date": "2020-12-10T00:00:00.000Z",
        "invoice": {
          "invoiceID": "00000000-0000-0000-0000-000000000000"
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
      "overpayments": [
        {
          "overpaymentID": "00000000-0000-0000-0000-000000000000",
          "type": "RECEIVE-OVERPAYMENT",
          "date": "2020-12-10T00:00:00.000Z",
          "status": "AUTHORISED",
          "lineAmountTypes": "Exclusive",
          "lineItems": [
            {
              "lineItemID": "00000000-0000-0000-0000-000000000000",
              "description": "Foobar",
              "quantity": 1.0,
              "unitAmount": 100.0,
              "taxType": "NONE",
              "taxAmount": 0.0,
              "lineAmount": 100.0,
              "accountCode": "140"
            }
          ],
          "subTotal": 100.0,
          "totalTax": 0.0,
          "total": 100.0,
          "updatedDateUTC": "/Date(1684354973404)/",
          "currencyCode": "USD",
          "fullyPaidOnDate": "2020-12-10T00:00:00.000Z",
          "amountDue": 0.0,
          "amountPaid": 100.0,
          "amountCredited": 0.0,
          "hasAttachments": false,
          "allocations": [
            {
              "amount": 100.0,
              "date": "2020-12-10T00:00:00.000Z",
              "invoice": {
                "invoiceID": "00000000-0000-0000-0000-000000000000"
              }
            }
          ]
        }
      ]
    }
}
```
