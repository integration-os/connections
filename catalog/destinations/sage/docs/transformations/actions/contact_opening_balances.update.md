### Update Contact Opening Balance

Update an existing contact opening balance for a contact.

[Documentation](https://developer.sage.com/accounting/reference/opening-balances/#tag/Contact-Opening-Balances/operation/putContactOpeningBalances)

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
    "contact_id": "string",
    "date": "2019-08-24",
    "debit": 0,
    "credit": 0,
    "transaction_type_id": "string"
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
  "contact_opening_balance_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "contact": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "date": "2019-08-24",
  "reference": "string",
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
  "currency": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "exchange_rate": 0,
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
  "base_currency_total_amount": 0
}
```
