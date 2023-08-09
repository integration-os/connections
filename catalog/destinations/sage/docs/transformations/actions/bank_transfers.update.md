### Update Bank Transfer

Update a bank transfer between two bank accounts.

[Documentation](https://developer.sage.com/accounting/reference/banking/#tag/Bank-Transfers/operation/putBankTransfersKey)

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
    "bank_transfer": {
      "from_bank_account_id": "string",
      "to_bank_account_id": "string",
      "date": "2019-08-24",
      "amount": 0,
      "reference": "string",
      "description": "string"
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
  "deleted_at": "2019-08-24T14:15:22Z",
  "from_bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "deleted_at": "2019-08-24T14:15:22Z",
    "bank_account_details": {},
    "ledger_account": {},
    "bank_account_type": {},
    "balance": 0,
    "main_address": {},
    "main_contact_person": {},
    "nominal_code": 0,
    "editable": true,
    "deletable": true,
    "journal_code": {},
    "default_payment_method": {},
    "gifi_code": 0,
    "is_active": true,
    "currency": {}
  },
  "to_bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "deleted_at": "2019-08-24T14:15:22Z",
    "bank_account_details": {},
    "ledger_account": {},
    "bank_account_type": {},
    "balance": 0,
    "main_address": {},
    "main_contact_person": {},
    "nominal_code": 0,
    "editable": true,
    "deletable": true,
    "journal_code": {},
    "default_payment_method": {},
    "gifi_code": 0,
    "is_active": true,
    "currency": {}
  },
  "date": "2019-08-24",
  "reference": "string",
  "amount": 0,
  "description": "string"
}
```
