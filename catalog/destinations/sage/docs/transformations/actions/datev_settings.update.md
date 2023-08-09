### Update Datev Settings

Update the Datev Settings in the system.

[Documentation](https://developer.sage.com/accounting/reference/settings/#tag/Datev-Settings/operation/putDatevSettings)

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
    "datev_settings": {
      "tax_consultant_number": 1000,
      "client_number": 1,
      "next_customer_number": 10000,
      "next_supplier_number": 70000
    }
  }
}
```

**Sample Response**

```json
{
  "$path": "string",
  "tax_consultant_number": 0,
  "client_number": 0,
  "next_customer_number": 0,
  "next_supplier_number": 0,
  "updated_at": "2019-08-24T14:15:22Z"
}
```
