### Create Ledger Accounts

Create a new ledger account.

[Documentation](https://developer.sage.com/accounting/reference/accounting-setup/#tag/Ledger-Accounts)

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
    "ledger_account": {
      "ledger_account_type_id": "string",
      "included_in_chart": true,
      "name": "string",
      "display_name": "string",
      "nominal_code": 1,
      "ledger_account_classification_id": "string",
      "tax_rate_id": "string",
      "fixed_tax_rate": true,
      "visible_in_banking": true,
      "visible_in_expenses": true,
      "visible_in_journals": true,
      "visible_in_other_payments": true,
      "visible_in_other_receipts": true,
      "visible_in_reporting": true,
      "visible_in_sales": true,
      "control_name": "string",
      "tax_recoverable": true,
      "recoverable_percentage": 0,
      "non_recoverable_ledger_account_id": "string",
      "cis_materials": true,
      "cis_labour": true,
      "gifi_code": 1000
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
  "ledger_account_group": {
    "id": "string",
    "displayed_as": "string"
  },
  "name": "string",
  "display_name": "string",
  "visible_scopes": [
    "string"
  ],
  "included_in_chart": true,
  "nominal_code": 0,
  "ledger_account_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "ledger_account_classification": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "tax_rate": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "fixed_tax_rate": true,
  "visible_in_banking": true,
  "visible_in_expenses": true,
  "visible_in_journals": true,
  "visible_in_other_payments": true,
  "visible_in_other_receipts": true,
  "visible_in_reporting": true,
  "visible_in_sales": true,
  "balance_details": {
    "balance": 0,
    "credit_or_debit": "string",
    "credits": 0,
    "debits": 0,
    "from_date": "string",
    "to_date": "string"
  },
  "is_control_account": true,
  "control_name": "string",
  "display_formatted": "string",
  "tax_recoverable": true,
  "recoverable_percentage": 0,
  "non_recoverable_ledger_account": {},
  "cis_materials": true,
  "tax_instalment": true,
  "cis_labour": true,
  "gifi_code": 0
}
```

