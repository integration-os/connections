### Create Bank Reconciliation

Create a new bank reconciliation for a bank account.

[Documentation](https://developer.sage.com/accounting/reference/banking/#tag/Bank-Reconciliations/operation/postBankReconciliations)

**Types**

```ts
interface ActionPayload {
  id?: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Request**

```json
{
  "body": {
    "bank_reconciliation": {
      "bank_account_id": "string",
      "statement_date": "2019-08-24",
      "statement_end_balance": 0,
      "reference": "string",
      "total_received": 0,
      "total_paid": 0,
      "starting_balance": 0,
      "closing_balance": 0,
      "reconciled_balance": 0,
      "balance_difference": 0,
      "status_id": "string"
    }
  }
}
```

**Sample Response**

```json
{
  "id": "string",
  "displayed_as": "string",
  "$path": "string",
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "statement_date": "2019-08-24",
  "statement_end_balance": 0,
  "reference": "string",
  "total_received": 0,
  "total_paid": 0,
  "starting_balance": 0,
  "closing_balance": 0,
  "reconciled_balance": 0,
  "balance_difference": 0,
  "status": {
    "id": "string",
    "displayed_as": "string"
  }
}
```
