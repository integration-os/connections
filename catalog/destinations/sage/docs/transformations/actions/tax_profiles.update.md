### Update Tax Profile

Update a tax profile.

[Documentation](https://developer.sage.com/accounting/reference/taxes/#tag/Tax-Profiles/operation/putTaxProfilesKey)

**Types**
```ts
interface ActionPayload {
  id: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**
```json
{
  "id": "string",
  "body": {
    "tax_profile": {
      "tax_type_id": "string",
      "tax_number": "string",
      "tax_number_suffix": "string",
      "collect_tax": true,
      "tax_return_frequency_id": "string",
      "address_region": {
        "name": "string",
        "code": "string"
      }
    }
  }
}
```
