### Create Other Payments

Create a new other payment.

[Documentation](https://developer.sage.com/accounting/reference/payments/#tag/Other-Payments/operation/postOtherPayments)

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
    "other_payment": {
      "transaction_type_id": "string",
      "date": "2019-08-24",
      "total_amount": 0,
      "base_currency_total_itc_amount": 0,
      "total_itc_amount": 0,
      "base_currency_total_itr_amount": 0,
      "total_itr_amount": 0,
      "part_recoverable": true,
      "payment_method_id": "string",
      "contact_id": "string",
      "bank_account_id": "string",
      "tax_address_region_id": "string",
      "net_amount": 0,
      "tax_amount": 0,
      "reference": "string",
      "withholding_tax_rate": 0,
      "withholding_tax_amount": 0,
      "payment_lines": [
        {
          "ledger_account_id": "string",
          "total_amount": 0,
          "analysis_type_categories": [
            "string"
          ],
          "details": "string",
          "tax_rate_id": "string",
          "net_amount": 0,
          "tax_amount": 0,
          "is_purchase_for_resale": true,
          "trade_of_asset": true,
          "gst_amount": 0,
          "pst_amount": 0,
          "tax_recoverable": true
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
  "base_currency_total_itc_amount": 0,
  "total_itc_amount": 0,
  "base_currency_total_itr_amount": 0,
  "total_itr_amount": 0,
  "part_recoverable": true,
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
  "tax_address_region": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "date": "2019-08-24",
  "net_amount": 0,
  "tax_amount": 0,
  "total_amount": 0,
  "reference": "string",
  "payment_lines": [
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
      "ledger_account": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "details": "string",
      "tax_rate": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string"
      },
      "net_amount": 0,
      "tax_amount": 0,
      "total_amount": 0,
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
      "is_purchase_for_resale": true,
      "trade_of_asset": true,
      "gst_amount": 0,
      "pst_amount": 0,
      "tax_recoverable": true
    }
  ],
  "editable": true,
  "deletable": true,
  "withholding_tax_rate": 0,
  "withholding_tax_amount": 0
}
```
