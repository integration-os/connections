### Create Bank Transfer

Create a new bank transfer between two bank accounts.

[Documentation](https://developer.sage.com/accounting/reference/banking/#tag/Bank-Transfers/operation/postBankTransfers)

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
    "bank_transfer": {
      "from_bank_account_id": "string",
      "to_bank_account_id": "string",
      "date": "2019-08-24",
      "amount": 0,
      "reference": "string",
      "description": "string"
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
  "from_bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "deleted_at": "2019-08-24T14:15:22Z",
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
  },
  "to_bank_account": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "deleted_at": "2019-08-24T14:15:22Z",
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
  },
  "date": "2019-08-24",
  "reference": "string",
  "amount": 0,
  "description": "string"
}
```
