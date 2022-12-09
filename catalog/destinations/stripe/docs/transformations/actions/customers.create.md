### Create Customer

Create a customer in Stripe.

[Documentation](https://stripe.com/docs/api/customers/create)

**Types**

```ts
interface CreateCustomerPayload {
  address?: string;
  balance?: number;
  cash_balance?: object;
  coupon?: string;
  description?: string;
  email?: string;
  expand?: Array<string>;
  invoice_prefix?: string;
  invoice_settings?: object;
  metadata?: object;
  name?: string;
  next_invoice_sequence?: number;
  payment_method?: string;
  phone?: string;
  preferred_locales?: Array<string>;
  promotion_code?: string;
  shipping?: object;
  source?: string;
  tax?: object;
  tax_exempt?: object;
  tax_id_data?: string[];
  test_clock?: string;
}
```

**Sample Payload**

```js
{
  name: "John Doe",
  email: "john@example.com"
}
```

**Sample Response**

```json
{
  "id": "cus_4QFOF3xrvBT2nU",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1405641986,
  "currency": "usd",
  "default_source": "card_14HOtJ2eZvKYlo2CD2lt4r4W",
  "delinquent": true,
  "description": "",
  "discount": null,
  "email": "john@example.com",
  "invoice_prefix": "93EC0E1",
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
  "name": "John Doe",
  "next_invoice_sequence": 68506,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none",
  "test_clock": null
}
```
