### Create Bank Account

Create a new bank account for a contact.

[Documentation](https://developer.sage.com/accounting/reference/banking/#tag/bank_accounts)

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
    "bank_account": {
      "bank_account_type_id": "string",
      "ledger_account_id": "string",
      "nominal_code": 99999999,
      "default_payment_method_id": "string",
      "gifi_code": 9999,
      "is_active": true,
      "currency_id": "string",
      "bank_account_details": {
        "account_name": "string",
        "account_number": "string",
        "sort_code": "string",
        "bic": "string",
        "iban": "string"
      },
      "main_address": {
        "address_line_1": "string",
        "address_line_2": "string",
        "city": "string",
        "postal_code": "string",
        "country_id": "string",
        "bank_account_id": "string",
        "contact_id": "string",
        "address_type_id": "string",
        "name": "string",
        "region": "string",
        "country_group_id": "string",
        "is_main_address": true
      },
      "main_contact_person": {
        "name": "string",
        "job_title": "string",
        "telephone": "string",
        "mobile": "string",
        "email": "string",
        "fax": "string"
      },
      "journal_code": {
        "name": "string",
        "code": "string",
        "journal_code_type_id": "string",
        "control_name": "string",
        "reserved": true
      }
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
  "created_at": "2023-05-28T18:48:11.993Z",
  "updated_at": "2023-05-28T18:48:11.993Z",
  "deleted_at": "2023-05-28T18:48:11.993Z",
  "bank_account_details": {
    "account_name": "string",
    "account_number": "string",
    "sort_code": "string",
    "bic": "string",
    "iban": "string"
  },
  "ledger_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "bank_account_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "balance": 0,
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
    "deleted_at": "2023-05-28T18:48:11.993Z",
    "created_at": "2023-05-28T18:48:11.993Z",
    "updated_at": "2023-05-28T18:48:11.993Z",
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
    "name": "string",
    "job_title": "string",
    "telephone": "string",
    "mobile": "string",
    "email": "string",
    "fax": "string"
  },
  "nominal_code": 0,
  "editable": true,
  "deletable": true,
  "journal_code": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2023-05-28T18:48:11.993Z",
    "updated_at": "2023-05-28T18:48:11.993Z",
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
  "default_payment_method": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "gifi_code": 0,
  "is_active": true,
  "currency": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  }
}
```
