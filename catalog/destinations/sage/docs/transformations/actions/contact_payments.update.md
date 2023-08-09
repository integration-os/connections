### Update Contact Payments

Update an existing contact payment for a contact.

[Documentation](https://developer.sage.com/accounting/reference/payments/#tag/Contact-Payments/operation/putContactPaymentsKey)

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
    "contact_payment": {
      "transaction_type_id": "string",
      "contact_id": "string",
      "bank_account_id": "string",
      "date": "2019-08-24",
      "total_amount": 0,
      "payment_method_id": "string",
      "net_amount": 0,
      "tax_amount": 0,
      "currency_id": "string",
      "exchange_rate": 0,
      "base_currency_net_amount": 0,
      "base_currency_tax_amount": 0,
      "base_currency_total_amount": 0,
      "base_currency_currency_charge": 0,
      "reference": "string",
      "tax_rate_id": "string",
      "allocated_artefacts": [
        {
          "artefact_id": "string",
          "amount": 0,
          "discount": 0
        }
      ],
      "payment_on_account": {
        "contact_name": "string",
        "contact_reference": "string",
        "contact_id": "string",
        "date": "2019-08-24",
        "reference": "string",
        "net_amount": 0,
        "tax_amount": 0,
        "total_amount": 0,
        "outstanding_amount": 0,
        "currency_id": "string",
        "exchange_rate": 0,
        "base_currency_net_amount": 0,
        "base_currency_tax_amount": 0,
        "base_currency_total_amount": 0,
        "base_currency_outstanding_amount": 0,
        "status_id": "string"
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
}
```
