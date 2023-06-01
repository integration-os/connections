### Update Invoice Settings

Update the Invoice Settings in the system.

[Documentation](https://developer.sage.com/accounting/reference/settings/#tag/Invoice-Settings/operation/putInvoiceSettings)

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
  "invoice_settings": {
    "next_invoice_number": 1,
    "next_credit_note_number": 1,
    "separate_invoice_credit_note_numbering": true,
    "sales_invoice_number_prefix": "string",
    "sales_credit_note_number_prefix": "string",
    "invoice_terms_and_conditions": "string",
    "default_note_on_invoice": "string",
    "default_note_on_credit_note": "string",
    "default_note_on_estimate": "string",
    "default_note_on_quote": "string",
    "next_quote_number": 1,
    "quote_number_prefix": "string",
    "estimate_number_prefix": "string",
    "quote_default_days_to_expiry": 365,
    "estimate_default_days_to_expiry": 365,
    "quote_terms_and_conditions": "string",
    "estimate_terms_and_conditions": "string",
    "delivery_note_terms_and_conditions": "string",
    "delivery_note_show_signature": true,
    "delivery_note_show_picked": true,
    "delivery_note_show_notes": true,
    "delivery_note_show_contact_details": true,
    "quick_entry_prefix": "string",
    "late_payment_percentage": 0,
    "prompt_payment_percentage": 0,
    "show_auto_entrepreneur": true,
    "show_insurance": true,
    "insurer_id": "string",
    "insurance_area": "string",
    "insurance_type": "string",
    "insurance_text": "string",
    "payment_bank_account_id": "string",
    "sales_corrective_invoice_number_prefix": "string",
    "next_sales_corrective_invoice_number": 1,
    "customer_credit_days": 365,
    "vendor_credit_days": 365,
    "customer_credit_terms": "month_end_invoice",
    "vendor_credit_terms": "month_end_payment",
    "document_headings": {
      "sales_invoice": "string",
      "sales_credit_note": "string",
      "sales_corrective_invoice": "string",
      "sales_quote": "string",
      "sales_estimate": "string",
      "pro_forma": "string",
      "remittance_advice": "string",
      "statement": "string",
      "delivery_note": "string"
    },
    "line_item_titles": {
      "description": "string",
      "unit_price": "string",
      "quantity": "string",
      "discount": "string"
    },
    "footer_details": {
      "column_1": "string",
      "column_2": "string",
      "column_3": "string"
    },
    "print_contact_details": {
      "business_name": true,
      "website": true,
      "telephone": true,
      "mobile": true,
      "email_address": true,
      "due_date": true,
      "default_delivery_address": "string"
    },
    "print_statements": {
      "days_overdue": true,
      "table_of_balances": true
    }
  }
}
```

**Sample Response**

```json
{
  "$path": "string",
  "next_invoice_number": 0,
  "next_credit_note_number": 0,
  "separate_invoice_credit_note_numbering": true,
  "sales_invoice_number_prefix": "string",
  "sales_credit_note_number_prefix": "string",
  "invoice_terms_and_conditions": "string",
  "default_note_on_invoice": "string",
  "default_note_on_credit_note": "string",
  "default_note_on_estimate": "string",
  "default_note_on_quote": "string",
  "next_quote_number": 0,
  "quote_number_prefix": "string",
  "estimate_number_prefix": "string",
  "quote_default_days_to_expiry": 0,
  "estimate_default_days_to_expiry": 0,
  "quote_terms_and_conditions": "string",
  "estimate_terms_and_conditions": "string",
  "delivery_note_terms_and_conditions": "string",
  "delivery_note_show_signature": true,
  "delivery_note_show_picked": true,
  "delivery_note_show_notes": true,
  "delivery_note_show_contact_details": true,
  "quick_entry_prefix": "string",
  "late_payment_percentage": 0,
  "prompt_payment_percentage": 0,
  "show_auto_entrepreneur": true,
  "show_insurance": true,
  "insurer": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "links": [
      {
        "href": "string",
        "rel": "string",
        "type": "string"
      }
    ],
    "deleted_at": "2019-08-24T14:15:22Z",
    "balance": 0,
    "contact_types": [
      {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      }
    ],
    "name": "string",
    "reference": "string",
    "default_sales_ledger_account": {
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
    "default_sales_tax_rate": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "default_purchase_ledger_account": {
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
    "tax_number": "string",
    "notes": "string",
    "locale": "string",
    "main_address": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string",
      "address_line_1": "string",
      "address_line_2": "string",
      "city": "string",
      "postal_code": "string",
      "country": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "deleted_at": "2019-08-24T14:15:22Z",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z",
      "bank_account": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "contact": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "address_type": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "name": "string",
      "region": "string",
      "country_group": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "is_main_address": true
    },
    "delivery_address": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string",
      "address_line_1": "string",
      "address_line_2": "string",
      "city": "string",
      "postal_code": "string",
      "country": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "deleted_at": "2019-08-24T14:15:22Z",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z",
      "bank_account": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "contact": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "address_type": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "name": "string",
      "region": "string",
      "country_group": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "is_main_address": true
    },
    "main_contact_person": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z",
      "deleted_at": "2019-08-24T14:15:22Z",
      "contact_person_types": [
        {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        }
      ],
      "name": "string",
      "job_title": "string",
      "telephone": "string",
      "mobile": "string",
      "email": "string",
      "fax": "string",
      "is_main_contact": true,
      "address": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "is_preferred_contact": true
    },
    "bank_account_details": {
      "account_name": "string",
      "account_number": "string",
      "sort_code": "string",
      "bic": "string",
      "iban": "string"
    },
    "credit_limit": 0,
    "credit_days": 0,
    "credit_terms": "month_end_invoice",
    "credit_terms_and_conditions": "string",
    "product_sales_price_type": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "source_guid": "string",
    "currency": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "aux_reference": "stri",
    "registered_number": "string",
    "deletable": true,
    "tax_treatment": {
      "home_tax": true,
      "eu_tax_registered": true,
      "eu_not_tax_registered": true,
      "rest_of_world_tax": true,
      "is_importer": true
    },
    "email": "string",
    "tax_calculation": "string",
    "auxiliary_account": "string",
    "gdpr_obfuscated": true,
    "system": true,
    "has_unfinished_recurring_invoices": true,
    "cis_registered": true,
    "ni_based": true,
    "is_active": true,
    "gb_based": true,
    "cis_settings": {
      "registered_cis_name": "string",
      "subcontractor_verification_number": "string",
      "deduction_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      }
    },
    "destination_vat_blocking": true
  },
  "insurance_area": "string",
  "insurance_type": "string",
  "insurance_text": "string",
  "payment_bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "sales_corrective_invoice_number_prefix": "string",
  "next_sales_corrective_invoice_number": 0,
  "document_headings": {
    "sales_invoice": "string",
    "sales_credit_note": "string",
    "sales_corrective_invoice": "string",
    "sales_quote": "string",
    "sales_estimate": "string",
    "pro_forma": "string",
    "remittance_advice": "string",
    "statement": "string",
    "delivery_note": "string"
  },
  "line_item_titles": {
    "description": "string",
    "unit_price": "string",
    "quantity": "string",
    "discount": "string"
  },
  "footer_details": {
    "column_1": "string",
    "column_2": "string",
    "column_3": "string"
  },
  "print_contact_details": {
    "business_name": true,
    "website": true,
    "telephone": true,
    "mobile": true,
    "email_address": true,
    "due_date": true,
    "default_delivery_address": "string"
  },
  "print_statements": {
    "days_overdue": true,
    "table_of_balances": true
  },
  "customer_credit_days": 0,
  "vendor_credit_days": 0,
  "customer_credit_terms": "month_end_invoice",
  "vendor_credit_terms": "month_end_payment",
  "updated_at": "2019-08-24T14:15:22Z"
}
```
