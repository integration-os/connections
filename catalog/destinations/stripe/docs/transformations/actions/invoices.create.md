### Create Invoice

This endpoint creates a draft invoice for a given customer. The invoice remains a draft until you finalize the invoice, which allows you to pay or send the invoice to your customers.

[Documentation](https://stripe.com/docs/api/invoices/create)

**Types**

```ts
interface InvoiceCreatePayload {
  account_tax_ids?: string[];
  application_fee_amount?: number;
  auto_advance?: boolean;
  automatic_tax?: object;
  collection_method?: object;
  custom_fields?: object[];
  customer?: string;
  days_until_due?: number;
  default_payment_method?: string;
  default_source?: string;
  default_tax_rates?: Array<string>;
  description?: string;
  discounts?: object[];
  due_date?: number;
  expand?: Array<string>;
  footer?: string;
  metadata?: object;
  on_behalf_of?: string;
  payment_settings?: object;
  pending_invoice_items_behavior?: object;
  statement_descriptor?: string;
  subscription?: string;
  transfer_data?: object;
}
```

**Sample Payload**

```js
{
  customer: 'cus_4QFOF3xrvBT2nU'
}
```

**Sample Response**

```json
{
  "id": "in_1MDA5I2eZvKYlo2CpI12bJUh",
  "object": "invoice",
  "account_country": "US",
  "account_name": "Stripe.com",
  "account_tax_ids": null,
  "amount_due": 1500,
  "amount_paid": 0,
  "amount_remaining": 1500,
  "application": null,
  "application_fee_amount": null,
  "attempt_count": 0,
  "attempted": false,
  "auto_advance": false,
  "automatic_tax": {
    "enabled": false,
    "status": null
  },
  "billing_reason": "manual",
  "charge": null,
  "collection_method": "charge_automatically",
  "created": 1670605804,
  "currency": "usd",
  "custom_fields": null,
  "customer": "cus_4QFOF3xrvBT2nU",
  "customer_address": null,
  "customer_email": null,
  "customer_name": null,
  "customer_phone": null,
  "customer_shipping": null,
  "customer_tax_exempt": "none",
  "customer_tax_ids": [
    {
      "type": "eu_vat",
      "value": "DE123456789"
    }
  ],
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discount": null,
  "discounts": [],
  "due_date": null,
  "ending_balance": null,
  "footer": null,
  "from_invoice": null,
  "hosted_invoice_url": null,
  "invoice_pdf": null,
  "last_finalization_error": null,
  "latest_revision": null,
  "lines": {
    "object": "list",
    "data": [
      {
        "id": "il_1MDA5I2eZvKYlo2C0JhpLJ8C",
        "object": "line_item",
        "amount": 1500,
        "amount_excluding_tax": 1500,
        "currency": "usd",
        "description": "My First Invoice Item (created for API docs)",
        "discount_amounts": [],
        "discountable": true,
        "discounts": [],
        "invoice_item": "ii_1MDA5I2eZvKYlo2CQi5LrIvV",
        "livemode": false,
        "metadata": {},
        "period": {
          "end": 1670605804,
          "start": 1670605804
        },
        "price": {
          "id": "price_1MD9Cf2eZvKYlo2C4XqqxljX",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1670602417,
          "currency": "usd",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": null,
          "metadata": {},
          "nickname": null,
          "product": "prod_Mx3JvazNKVY19A",
          "recurring": null,
          "tax_behavior": "unspecified",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "one_time",
          "unit_amount": 1500,
          "unit_amount_decimal": "1500"
        },
        "proration": false,
        "proration_details": {
          "credited_items": null
        },
        "quantity": 1,
        "subscription": null,
        "tax_amounts": [],
        "tax_rates": [],
        "type": "invoiceitem",
        "unit_amount_excluding_tax": "1500"
      }
    ],
    "has_more": false,
    "url": "/v1/invoices/in_1MDA5I2eZvKYlo2CpI12bJUh/lines"
  },
  "livemode": false,
  "metadata": {},
  "next_payment_attempt": 1670609404,
  "number": null,
  "on_behalf_of": null,
  "paid": false,
  "paid_out_of_band": false,
  "payment_intent": null,
  "payment_settings": {
    "default_mandate": null,
    "payment_method_options": null,
    "payment_method_types": null
  },
  "period_end": 1673153680,
  "period_start": 1670475280,
  "post_payment_credit_notes_amount": 0,
  "pre_payment_credit_notes_amount": 0,
  "quote": null,
  "receipt_number": null,
  "redaction": null,
  "rendering_options": null,
  "starting_balance": 0,
  "statement_descriptor": null,
  "status": "draft",
  "status_transitions": {
    "finalized_at": null,
    "marked_uncollectible_at": null,
    "paid_at": null,
    "voided_at": null
  },
  "subscription": null,
  "subtotal": 1500,
  "subtotal_excluding_tax": 1500,
  "tax": null,
  "test_clock": null,
  "total": 1500,
  "total_discount_amounts": [],
  "total_excluding_tax": 1500,
  "total_tax_amounts": [],
  "transfer_data": null,
  "webhooks_delivered_at": null
}
```
