### Update Customer

Update a customer in Stripe.

[Documentation](https://stripe.com/docs/api/customers/update)

**Types**

```ts
type UpdateCustomerPayload = [
  // Customer ID
  string,

  // Update Payload
  object
]

```

**Sample Payload**

```js
[
  'cus_HufrkBK3WkMuTq',
  {
    metadata: {
      order_id: '6735'
    }
  }
]
```

**Sample Response**

```json
{
  "id": "cus_HufrkBK3WkMuTq",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1598555489,
  "currency": null,
  "default_source": "card_1HKqVSJL6uTTudKv9EvAzRre",
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": "some@email11.com",
  "invoice_prefix": "69214C0C",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {
    "order_id": "6735"
  },
  "name": null,
  "next_invoice_sequence": 1,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none",
  "test_clock": null
}
```
