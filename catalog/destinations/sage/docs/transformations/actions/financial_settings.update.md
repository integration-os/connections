### Update Financial Settings

Update the Financial Settings in the system.

[Documentation](https://developer.sage.com/accounting/reference/settings/#tag/Financial-Settings/operation/putFinancialSettings)

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
    "financial_settings": {
      "year_end_date": "2019-08-24",
      "year_end_lockdown_date": "2019-08-24",
      "accounting_type": "string",
      "accounts_start_date": "2019-08-24",
      "base_currency_id": "string",
      "multi_currency_enabled": true,
      "use_live_exchange_rates": true,
      "mtd_activation_status": "string",
      "mtd_connected": true,
      "mtd_authenticated_date": "2019-08-24",
      "tax_scheme_id": "string",
      "tax_return_frequency_id": "string",
      "tax_number": "string",
      "general_tax_number": "string",
      "tax_office_id": "string",
      "default_irpf_rate": 0,
      "flat_rate_tax_percentage": 0,
      "recoverable_percentage": 0,
      "sales_tax_calculation": "string",
      "purchase_tax_calculation": "string",
      "postponed_accounting": true,
      "destination_vat": true
    }
  }
}
```


