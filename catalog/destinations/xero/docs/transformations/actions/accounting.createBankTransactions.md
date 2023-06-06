### Create Bank Transactions

Create a new bank transaction in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createBankTransactions)

**Sample Payload**

```json
{
  "summarizeErrors": true,
  "unitdp": 4,
  "bankTransactions": {
    "bankTransactions": [
      {
        "type": "RECEIVE",
        "contact": {
          "contactID": "273f9a21-0a99-46de-8488-add5ad660365"
        },
        "lineItems": [
          {
            "description": "Foobar",
            "quantity": 1,
            "unitAmount": 20,
            "accountCode": "000"
          }
        ],
        "bankAccount": {
          "accountID": "f26bf6e9-42e1-438f-9db9-3b2f228de8be"
        }
      }
    ]
  }
}

```

**Sample Response**

```json
{
  "tenant1":
    {
      "bankTransactions": [
        {
          "contact": {
            "contactID": "6d42f03b-181f-43e3-93fb-2025c012de92",
            "came": "Wilson Periodicals"
          },
          "date": "2014-05-26T00:00:00",
          "status": "AUTHORISED",
          "ineAmountTypes": "Inclusive",
          "lineItems": [
            {
              "description": "Monthly account fee",
              "unitAmount": "49.90",
              "taxType": "NONE",
              "taxAmount": "0.00",
              "lineAmount": "49.90",
              "accountCode": "404",
              "quantity": "1.0000",
              "lineItemID": "52208ff9-528a-4985-a9ad-b2b1d4210e38"
            }
          ],
          "subTotal": "49.90",
          "totalTax": "0.00",
          "total": "49.90",
          "updatedDateUTC": "\/Date(1439434356790+0000)\/",
          "currencyCode": "NZD",
          "bankTransactionID": "d20b6c54-7f5d-4ce6-ab83-55f609719126",
          "bankAccount": {
            "accountID": "ac993f75-035b-433c-82e0-7b7a2d40802c",
            "code": "090",
            "name": "Business Bank Account"
          },
          "batchPayment": {
            "account": {
              "accountID": "ac993f75-035b-433c-82e0-7b7a2d40802c"
            },
            "batchPaymentID": "b54aa50c-794c-461b-89d1-846e1b84d9c0",
            "date": "\/Date(1401062400000+0000)\/",
            "type": "RECBATCH",
            "status": "AUTHORISED",
            "totalAmount": "100.00",
            "updatedDateUTC": "\/Date(1439434356790+0000)\/",
            "isReconciled": "true"
          },
          "type": "SPEND",
          "reference": "Sub 098801",
          "isReconciled": "true"
        }
      ]
    }
}
```
