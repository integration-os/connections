### Create Bank Opening Balances

Create a new bank opening balance for a bank account.

[Documentation](https://developer.sage.com/accounting/reference/opening-balances/#tag/Bank-Opening-Balances/operation/postBankOpeningBalances)

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
  "body": {
    "bank_opening_balance": {
      "bank_account_id": "string",
      "date": "2019-08-24",
      "debit": 0,
      "credit": 0,
      "transaction_type_id": "string"
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
  "transaction": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "transaction_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "date": "2019-08-24",
  "debit": 0,
  "credit": 0
}
```
