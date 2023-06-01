### Create Journal reissue

Reissues an existing Journal by voiding the existing one and creating a new one

[Documentation](https://developer.sage.com/accounting/reference/accounting/#tag/Journals/operation/postJournalsKeyReissue)

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
  "id": "string"
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
  "date": "2019-08-24",
  "reference": "string",
  "description": "string",
  "total": 0,
  "journal_code": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "name": "string",
    "code": "string",
    "journal_code_type": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "control_name": "string",
    "reserved": true
  },
  "journal_lines": [
    {
      "id": "string",
      "ledger_account": {
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
      },
      "details": "string",
      "debit": 0,
      "credit": 0,
      "analysis_type_categories": [
        {
          "id": "string",
          "displayed_as": "string",
          "$path": "string",
          "analysis_type": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string",
            "created_at": "2019-08-24T14:15:22Z",
            "updated_at": "2019-08-24T14:15:22Z",
            "active_areas": [
              null
            ],
            "analysis_type_level": [
              null
            ],
            "analysis_type_categories": [
              {
                "id": "string",
                "displayed_as": "string",
                "$path": "string",
                "created_at": "2019-08-24T14:15:22Z",
                "updated_at": "2019-08-24T14:15:22Z",
                "code": "string",
                "name": "string",
                "combined_id": "string",
                "analysis_type": {
                  "id": "string",
                  "displayed_as": "string",
                  "$path": "string"
                }
              }
            ],
            "name": "string"
          }
        }
      ],
      "include_on_tax_return": true,
      "tax_reconciled": true,
      "cleared": true,
      "bank_reconciled": true,
      "journal_line_foreign_currency": "string"
    }
  ],
  "migrated": true
}
```
