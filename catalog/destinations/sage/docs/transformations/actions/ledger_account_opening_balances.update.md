### update Ledger Account Opening Balance

Updates an existing Ledger Account Opening Balance.

[Documentation](https://developer.sage.com/accounting/reference/opening-balances/#tag/Ledger-Account-Opening-Balances/operation/putLedgerAccountOpeningBalancesKey)

**Types**

```ts
interface ActionPayload {
  id?: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**

```json
{
  "id": "string",
  "body": {
    "ledger_account_opening_balance": {
      "ledger_account_id": "string",
      "debit": 0,
      "credit": 0,
      "details": "string"
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
  "ledger_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "details": "string",
  "debit": 0,
  "credit": 0
}
```
