### Create Sales Quick Entries

Create Sales Quick Entries

[Documentation](https://developer.sage.com/accounting/reference/invoicing-sales/#tag/Sales-Quick-Entries/operation/postSalesQuickEntries)

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
    "sales_quick_entry": {
      "quick_entry_type_id": "string",
      "date": "2019-08-24",
      "contact_id": "string",
      "reference": "string",
      "ledger_account_id": "string",
      "contact_name": "string",
      "contact_reference": "string",
      "details": "string",
      "net_amount": 0,
      "tax_rate_id": "string",
      "tax_amount": 0,
      "total_amount": 0,
      "currency_id": "string",
      "exchange_rate": 0,
      "inverse_exchange_rate": 0,
      "base_currency_net_amount": 0,
      "base_currency_tax_amount": 0,
      "base_currency_total_amount": 0,
      "status_id": "string",
      "tax_address_region_id": "string",
      "trade_of_asset": true,
      "analysis_type_categories": [
        {
          "analysis_type_id": "string"
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
  "quick_entry_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "contact_name": "string",
  "contact_reference": "string",
  "contact": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "date": "2019-08-24",
  "due_date": "2019-08-24",
  "reference": "string",
  "ledger_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "details": "string",
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
  "outstanding_amount": 0,
  "currency": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "exchange_rate": 0,
  "inverse_exchange_rate": 0,
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
  "base_currency_outstanding_amount": 0,
  "status": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
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
  "tax_address_region": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "migrated": true,
  "trade_of_asset": true
}
```
