### Update Address

Update an address for a customer.

[Documentation](https://developer.sage.com/accounting/reference/contacts/#tag/Addresses)

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
    "address": {
      "address_type_id": "string",
      "name": "string",
      "is_main_address": true,
      "address_line_1": "string",
      "address_line_2": "string",
      "city": "string",
      "postal_code": "string",
      "country_id": "string",
      "bank_account_id": "string",
      "contact_id": "string",
      "region": "string",
      "country_group_id": "string"
    }
  }
}
```

**Sample Response**

```json
{
  "address": {
    "address_type_id": "string",
    "name": "string",
    "is_main_address": true,
    "address_line_1": "string",
    "address_line_2": "string",
    "city": "string",
    "postal_code": "string",
    "country_id": "string",
    "bank_account_id": "string",
    "contact_id": "string",
    "region": "string",
    "country_group_id": "string"
  }
}
```
