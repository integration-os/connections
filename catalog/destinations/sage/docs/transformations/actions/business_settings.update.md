### Create Business Settings

Create a new business settings.

[Documentation](https://developer.sage.com/accounting/reference/settings/#tag/Business-Settings/operation/putBusinessSettings)

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
    "business_settings": {
      "siret": "string",
      "management_centre_member": true,
      "rcs_number": "string",
      "share_capital": 0,
      "business_activity_type_id": "string",
      "legal_form_type_id": "string",
      "auxiliary_accounts_visible": true,
      "business_type_id": "string",
      "country_of_registration_id": "string",
      "wizard_complete": true,
      "default_ledger_accounts": {
        "bank_charges_ledger_account_id": "string",
        "bank_interest_received_ledger_account_id": "string",
        "bank_interest_charges_paid_ledger_account_id": "string",
        "exchange_rate_gains_ledger_account_id": "string",
        "exchange_rate_losses_ledger_account_id": "string",
        "sales_ledger_account_id": "string",
        "sales_discount_ledger_account_id": "string",
        "purchase_ledger_account_id": "string",
        "purchase_discount_ledger_account_id": "string",
        "product_sales_ledger_account_id": "string",
        "product_purchase_ledger_account_id": "string",
        "service_sales_ledger_account_id": "string",
        "service_purchase_ledger_account_id": "string",
        "stock_purchase_ledger_account_id": "string",
        "other_receipt_ledger_account_id": "string",
        "other_payment_ledger_account_id": "string",
        "customer_receipt_discount_ledger_account_id": "string",
        "vendor_payment_discount_ledger_account_id": "string",
        "carriage_ledger_account_id": "string"
      }
    }
  }
}
```

**Sample Response**

```json
{
  "$path": "string",
  "siret": "string",
  "management_centre_member": true,
  "rcs_number": "string",
  "share_capital": 0,
  "business_activity_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "legal_form_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "auxiliary_accounts_visible": true,
  "default_ledger_accounts": {
    "bank_charges_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "bank_interest_received_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "bank_interest_charges_paid_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "exchange_rate_gains_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "exchange_rate_losses_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "sales_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "sales_discount_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "purchase_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "purchase_discount_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "product_sales_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "product_purchase_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "service_sales_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "service_purchase_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "stock_purchase_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "other_receipt_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "other_payment_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "customer_receipt_discount_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "vendor_payment_discount_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    },
    "carriage_ledger_account": {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    }
  },
  "business_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "name": "string",
    "description": "string"
  },
  "country_of_registration": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "business_created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "wizard_complete": true
}
```
