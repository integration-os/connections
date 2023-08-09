### Update Contact

Update a contact in the system.

[Documentation](https://developer.sage.com/accounting/reference/contacts/#tag/Contacts/operation/putContactsKey)

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
    "contact": {
      "name": "string",
      "contact_type_ids": [
        "string"
      ],
      "reference": "string",
      "default_sales_ledger_account_id": "string",
      "default_sales_tax_rate_id": "string",
      "default_purchase_ledger_account_id": "string",
      "tax_number": "string",
      "notes": "string",
      "locale": "string",
      "credit_limit": 0,
      "credit_days": 365,
      "credit_terms": "month_end_invoice",
      "credit_terms_and_conditions": "string",
      "product_sales_price_type_id": "string",
      "source_guid": "string",
      "currency_id": "string",
      "aux_reference": "string",
      "registered_number": "string",
      "tax_calculation": "string",
      "auxiliary_account": "string",
      "destination_vat_blocking": true,
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
      "delivery_address": {
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
        "contact_person_type_ids": [
          "string"
        ],
        "name": "string",
        "job_title": "string",
        "telephone": "string",
        "mobile": "string",
        "email": "string",
        "fax": "string",
        "is_main_contact": true,
        "address_id": "string",
        "is_preferred_contact": true
      },
      "bank_account_details": {
        "account_name": "string",
        "account_number": "string",
        "sort_code": "string",
        "bic": "string",
        "iban": "string"
      },
      "tax_treatment": {
        "home_tax": true,
        "eu_tax_registered": true,
        "eu_not_tax_registered": true,
        "rest_of_world_tax": true,
        "is_importer": true
      }
    }
  }
}
```


