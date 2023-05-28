### Create Address

Create a new address for a customer.

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
  "deleted_at": "2023-05-28T18:37:03.237Z",
  "created_at": "2023-05-28T18:37:03.237Z",
  "updated_at": "2023-05-28T18:37:03.237Z",
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
}
```


