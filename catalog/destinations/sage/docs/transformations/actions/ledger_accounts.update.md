### Update Ledger Accounts

Update ledger accounts in Sage.

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
