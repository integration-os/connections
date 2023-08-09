### Update Sales Corrective Invoices

Update Sales Corrective Invoices.

[Documentation](https://developer.sage.com/accounting/reference/invoicing-sales/#tag/Sales-Corrective-Invoices/operation/putSalesCorrectiveInvoicesKey)

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
    "sales_corrective_invoice": {
      "vat_reverse_charge": true,
      "destination_consignment": true,
      "contact_id": "string",
      "invoice_number_prefix": "string",
      "invoice_number": "string",
      "contact_name": "string",
      "contact_reference": "string",
      "date": "2019-08-24",
      "due_date": "2019-08-24",
      "reference": "string",
      "notes": "string",
      "terms_and_conditions": "string",
      "shipping_net_amount": 0,
      "shipping_tax_rate_id": "string",
      "shipping_tax_amount": 0,
      "shipping_total_amount": 0,
      "total_quantity": 0,
      "net_amount": 0,
      "tax_amount": 0,
      "total_amount": 0,
      "currency_id": "string",
      "exchange_rate": 0,
      "inverse_exchange_rate": 0,
      "base_currency_shipping_net_amount": 0,
      "base_currency_shipping_tax_amount": 0,
      "base_currency_shipping_total_amount": 0,
      "total_discount_amount": 0,
      "base_currency_total_discount_amount": 0,
      "base_currency_net_amount": 0,
      "base_currency_tax_amount": 0,
      "base_currency_total_amount": 0,
      "status_id": "string",
      "sent": true,
      "withholding_tax_rate": 0,
      "withholding_tax_amount": 0,
      "base_currency_withholding_tax_amount": 0,
      "corrective_reason_code_id": "string",
      "original_invoice_id": "string",
      "original_invoice_number": "string",
      "original_invoice_date": "string",
      "details": "string",
      "main_address": {
        "address_line_1": "string",
        "address_line_2": "string",
        "city": "string",
        "postal_code": "string",
        "country_id": "string",
        "address_type_id": "string",
        "region": "string",
        "country_group_id": "string"
      },
      "delivery_address": {
        "address_line_1": "string",
        "address_line_2": "string",
        "city": "string",
        "postal_code": "string",
        "country_id": "string",
        "address_type_id": "string",
        "region": "string",
        "country_group_id": "string"
      },
      "invoice_lines": [
        {
          "analysis_type_categories": [
            "string"
          ],
          "description": "string",
          "product_id": "string",
          "service_id": "string",
          "ledger_account_id": "string",
          "trade_of_asset": true,
          "quantity": 0,
          "unit_price": 0,
          "net_amount": 0,
          "tax_rate_id": "string",
          "tax_amount": 0,
          "total_amount": 0,
          "base_currency_unit_price": 0,
          "unit_price_includes_tax": true,
          "base_currency_net_amount": 0,
          "base_currency_tax_amount": 0,
          "base_currency_total_amount": 0,
          "eu_goods_services_type_id": "string",
          "discount_amount": 0,
          "base_currency_discount_amount": 0,
          "discount_percentage": 0,
          "eu_sales_description_id": "string"
        }
      ],
      "tax_analysis": [
        {
          "tax_rate_id": "string",
          "net_amount": 0,
          "tax_amount": 0,
          "total_amount": 0,
          "goods_amount": 0,
          "service_amount": 0
        }
      ]
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
  "links": [
    {
      "href": "string",
      "rel": "string",
      "type": "string"
    }
  ],
  "editable": true,
  "vat_reverse_charge": true,
  "tax_calculation_method": "string",
  "destination_consignment": true,
  "destination_vat_rates_in_use": true,
  "transaction": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "date": "2019-08-24",
    "deleted": true,
    "reference": "string",
    "total": 0,
    "total_in_transaction_currency": 0,
    "contact": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "transaction_type": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "origin": {
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
      "due_date": "2019-08-24",
      "outstanding_amount": 0,
      "currency": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "status": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "sent": true
    },
    "audit_trail_id": "string",
    "number_of_attachments": "string"
  },
  "transaction_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "contact": {
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
  "deleted_at": "2019-08-24T14:15:22Z",
  "invoice_number_prefix": "string",
  "invoice_number": "string",
  "contact_name": "string",
  "contact_reference": "string",
  "date": "2019-08-24",
  "due_date": "2019-08-24",
  "reference": "string",
  "main_address_free_form": "string",
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
    "address_type": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "region": "string",
    "country_group": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    }
  },
  "delivery_address_free_form": "string",
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
    "address_type": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "region": "string",
    "country_group": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    }
  },
  "notes": "string",
  "terms_and_conditions": "string",
  "shipping_net_amount": 0,
  "shipping_tax_rate": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "shipping_tax_amount": 0,
  "shipping_tax_breakdown": [
    {
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "percentage": 0,
      "amount": 0
    }
  ],
  "shipping_total_amount": 0,
  "total_quantity": 0,
  "net_amount": 0,
  "tax_amount": 0,
  "total_amount": 0,
  "payments_allocations_total_amount": 0,
  "payments_allocations_total_discount": 0,
  "total_paid": 0,
  "outstanding_amount": 0,
  "currency": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "exchange_rate": 0,
  "inverse_exchange_rate": 0,
  "base_currency_shipping_net_amount": 0,
  "base_currency_shipping_tax_amount": 0,
  "base_currency_shipping_tax_breakdown": [
    {
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "percentage": 0,
      "amount": 0
    }
  ],
  "base_currency_shipping_total_amount": 0,
  "total_discount_amount": 0,
  "base_currency_total_discount_amount": 0,
  "base_currency_net_amount": 0,
  "base_currency_tax_amount": 0,
  "base_currency_total_amount": 0,
  "base_currency_outstanding_amount": 0,
  "status": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "sent": true,
  "sent_by_email": true,
  "void_reason": "string",
  "invoice_lines": [
    {
      "id": "string",
      "displayed_as": "string",
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
      "description": "string",
      "product": {
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
        "active": true,
        "catalog_item_type": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        }
      },
      "service": {
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
        "purchase_ledger_account": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "sales_tax_rate": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "purchase_tax_rate": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "sales_rates": [
          {
            "id": "string",
            "displayed_as": "string",
            "created_at": "2019-08-24T14:15:22Z",
            "updated_at": "2019-08-24T14:15:22Z",
            "rate_name": "string",
            "rate": 0,
            "rate_includes_tax": true,
            "service_rate_type": {
              "id": "string",
              "displayed_as": "string",
              "$path": "string"
            }
          }
        ],
        "source_guid": "string",
        "purchase_description": "string",
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
        "active": true,
        "cost_price": 0,
        "oss_service": true
      },
      "ledger_account": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "trade_of_asset": true,
      "quantity": 0,
      "unit_price": 0,
      "net_amount": 0,
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "tax_amount": 0,
      "tax_breakdown": [
        {
          "tax_rate": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string"
          },
          "percentage": 0,
          "amount": 0
        }
      ],
      "total_amount": 0,
      "base_currency_unit_price": 0,
      "unit_price_includes_tax": true,
      "base_currency_net_amount": 0,
      "base_currency_tax_amount": 0,
      "base_currency_tax_breakdown": [
        {
          "tax_rate": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string"
          },
          "percentage": 0,
          "amount": 0
        }
      ],
      "base_currency_total_amount": 0,
      "eu_goods_services_type": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "discount_amount": 0,
      "base_currency_discount_amount": 0,
      "discount_percentage": 0,
      "eu_sales_description": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      }
    }
  ],
  "tax_analysis": [
    {
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "net_amount": 0,
      "tax_amount": 0,
      "total_amount": 0,
      "goods_amount": 0,
      "service_amount": 0
    }
  ],
  "detailed_tax_analysis": {
    "tax_rates_breakdown": {
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string",
        "created_at": "2019-08-24T14:15:22Z",
        "updated_at": "2019-08-24T14:15:22Z",
        "name": "string",
        "agency": "string",
        "percentage": 0,
        "percentages": [
          {
            "percentage": 0,
            "from_date": "2019-08-24",
            "to_date": "2019-08-24"
          }
        ],
        "is_visible": true,
        "retailer": true,
        "editable": true,
        "deletable": true,
        "is_combined_rate": true,
        "component_tax_rates": [
          {
            "id": "string",
            "displayed_as": "string",
            "$path": "string",
            "created_at": "2019-08-24T14:15:22Z",
            "updated_at": "2019-08-24T14:15:22Z",
            "name": "string",
            "agency": "string",
            "percentage": 0,
            "percentages": [
              {
                "percentage": 0,
                "from_date": "2019-08-24",
                "to_date": "2019-08-24"
              }
            ],
            "is_visible": true,
            "retailer": true,
            "editable": true,
            "deletable": true,
            "is_combined_rate": true
          }
        ]
      },
      "name": "string",
      "percentage": 0,
      "net_amount": 0,
      "tax_amount": 0,
      "retail_tax_amount": 0,
      "total_amount": 0,
      "goods_amount": 0,
      "services_amount": 0,
      "base_currency_net_amount": 0,
      "base_currency_tax_amount": 0,
      "base_currency_total_amount": 0,
      "base_currency_goods_amount": 0,
      "base_currency_services_amount": 0
    },
    "total_net": 0,
    "total_tax": 0,
    "total": 0,
    "total_goods_amount": 0,
    "total_services_amount": 0,
    "base_currency_total_net": 0,
    "base_currency_total_tax": 0,
    "base_currency_total": 0,
    "base_currency_total_goods_amount": 0,
    "base_currency_total_services_amount": 0,
    "total_retailer_tax": 0
  },
  "payments_allocations": [
    {
      "links": [
        {
          "href": "string",
          "rel": "string",
          "type": "string"
        }
      ],
      "date": "2019-08-24",
      "type": "string",
      "reference": "string",
      "amount": 0,
      "discount": 0,
      "stripe_transaction_id": "string",
      "contact_allocation": {
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
        "contact": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "allocated_artefacts": [
          {
            "id": "string",
            "artefact": {
              "id": "string",
              "displayed_as": "string",
              "$path": "string",
              "links": [
                {
                  "href": "string",
                  "rel": "string",
                  "type": "string"
                }
              ]
            },
            "amount": 0
          }
        ]
      },
      "artefact": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string",
        "links": [
          {
            "href": "string",
            "rel": "string",
            "type": "string"
          }
        ]
      },
      "contact_payment": {
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
        "payment_method": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "contact": {
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
        "net_amount": 0,
        "tax_amount": 0,
        "total_amount": 0,
        "currency": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "exchange_rate": 0,
        "base_currency_net_amount": 0,
        "base_currency_tax_amount": 0,
        "base_currency_total_amount": 0,
        "base_currency_currency_charge": 0,
        "reference": "string",
        "allocated_artefacts": [
          {
            "id": "string",
            "artefact": {
              "id": "string",
              "displayed_as": "string",
              "$path": "string",
              "links": [
                {
                  "href": "string",
                  "rel": "string",
                  "type": "string"
                }
              ]
            },
            "amount": 0,
            "discount": 0
          }
        ],
        "tax_rate": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string"
        },
        "payment_on_account": {
          "id": "string",
          "displayed_as": "string",
          "$path": "string",
          "created_at": "2019-08-24T14:15:22Z",
          "updated_at": "2019-08-24T14:15:22Z",
          "contact_name": "string",
          "contact_reference": "string",
          "contact": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string"
          },
          "date": "2019-08-24",
          "reference": "string",
          "net_amount": 0,
          "tax_amount": 0,
          "total_amount": 0,
          "outstanding_amount": 0,
          "currency": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string"
          },
          "exchange_rate": 0,
          "base_currency_net_amount": 0,
          "base_currency_tax_amount": 0,
          "base_currency_total_amount": 0,
          "base_currency_outstanding_amount": 0,
          "status": {
            "id": "string",
            "displayed_as": "string",
            "$path": "string"
          }
        },
        "editable": true
      },
      "displayed_as": "string",
      "negative_payment": true
    }
  ],
  "last_paid": "2019-08-24",
  "withholding_tax_rate": 0,
  "withholding_tax_amount": 0,
  "base_currency_withholding_tax_amount": 0,
  "corrective_reason_code": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "original_invoice": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "links": [
      {
        "href": "string",
        "rel": "string",
        "type": "string"
      }
    ]
  },
  "original_invoice_number": "string",
  "original_invoice_date": "string",
  "details": "string",
  "tax_reconciled": true
}
```
