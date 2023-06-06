### Create Stock Movement

Create a new stock movement.

[Documentation](https://developer.sage.com/accounting/reference/products-services/#tag/Stock-Movements/operation/postStockMovements)

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
    "stock_movement": {
      "stock_item_id": "string",
      "date": "2019-08-24",
      "quantity": 0,
      "cost_price": 0,
      "details": "string",
      "movement_number": "string",
      "reference": "string"
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
  "links": [
    {
      "href": "string",
      "rel": "string",
      "type": "string"
    }
  ],
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "movement_number": "stri",
  "date": "2019-08-24",
  "cost_price": 0,
  "quantity": 0,
  "details": "string",
  "reference": "string",
  "stock_item": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "deleted_at": "2019-08-24T14:15:22Z",
    "deletable": true,
    "deactivatable": true,
    "used_on_recurring_invoice": true,
    "item_code": "string",
    "description": "string",
    "notes": "string",
    "sales_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "sales_tax_rate": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "purchase_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "usual_supplier": {
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
    "purchase_tax_rate": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "cost_price": 0,
    "sales_prices": [
      {
        "id": "string",
        "displayed_as": "string",
        "created_at": "2019-08-24T14:15:22Z",
        "updated_at": "2019-08-24T14:15:22Z",
        "price_name": "string",
        "price": 0,
        "price_includes_tax": true,
        "product_sales_price_type": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        }
      }
    ],
    "source_guid": "string",
    "purchase_description": "string",
    "reorder_level": 0,
    "reorder_quantity": 0,
    "location": "string",
    "barcode": "string",
    "supplier_part_number": "string",
    "weight": 0,
    "measurement_unit": "string",
    "weight_converted": 0,
    "active": true,
    "quantity_in_stock": 0,
    "last_cost_price": 0,
    "last_cost_price_stock_value": 0,
    "average_cost_price": 0,
    "average_cost_price_stock_value": 0,
    "cost_price_last_updated": "2019-08-24"
  }
}
```
